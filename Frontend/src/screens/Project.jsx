import React, { useState,useContext} from 'react'
import { data, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../config/axios';
import { initializeSocket,receiveMessage,sendMessage } from '../config/socket';
import { UserContext } from '../context/user.context';
const Project = () => {
    const location =useLocation()
    const [isSidePanelOpen,setisSidePanelOpen]=useState(false);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [selectedUser,setSelectedUser]=useState([]);
    const [users,setUsers] = useState([]);
    const [project,setProject]=useState(location.state.project)
    const [message,setMessage]=useState('')
    const {user} =useContext(UserContext)
    const messageBox = React.useRef()
    const handleUserClick =(id)=>{
        setSelectedUser(prevSelectedUser=>{
            const newSelectedUser = new Set(prevSelectedUser);
            if(newSelectedUser.has(id)){
                newSelectedUser.delete(id)
            }else{
                newSelectedUser.add(id)
            }
            return newSelectedUser
        });
    }

    function addCollaborators(){
        axios.put('/project/add-user',{
            projectId:location.state.project._id,
            users:Array.from(selectedUser)
        }).then(res=>{
            console.log(res.data)
            setIsModalOpen(false)
        }).catch(err=>{
            console.log(err);
        })
    }
    const send=()=> {
        console.log(user)
        sendMessage('project-message',{
            message,
            sender:user
        })
        appendOutgoingMessage(message);
        setMessage("");
    }
    useEffect(()=>{
        initializeSocket(project._id);
        receiveMessage('project-message',data =>{
            console.log(data)
            appendIncomingMessage(data);
        })
        axios.get(`/project/get-project/${location.state.project._id}`).then(res=>{
            console.log(res.data);
            setProject(res.data.project)
        }).catch(err=>{
            console.log(err)
        })


        axios.get('/users/all').then(res=>{
            setUsers(res.data.users)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    function appendIncomingMessage(messageObject){
        const messageBox = document.querySelector('.message-box')
        const message = document.createElement('div')
        message.classList.add('message','max-w-56','flex','flex-col','p-2','bg-slate-50')
        message.innerHTML=`
                <small class='opacity-65 text-xs'>${messageObject.sender.email}</small>
                <p class='text-sm break-words whitespace-pre-wrap'>${messageObject.message}</p>
        `
        messageBox.appendChild(message)
    }

    function appendOutgoingMessage(message){
        const messageBox = document.querySelector('.message-box')
        const newMessage = document.createElement('div')
        newMessage.classList.add('ml-auto', 'max-w-56','message','flex','flex-col','p-2','bg-slate-50')
        newMessage.innerHTML=`
                <small claa='opacity-65 text-xs'>${user.email}</small>
                <p class='text-sm break-words whitespace-pre-wrap'>${message}</p>
        `
        messageBox.appendChild(newMessage);
        scrollToBottom()
    }

    function scrollToBottom(){
        messageBox.current.scrollTop = messageBox.current.scrollHeight
    }
  return (
    <main className='h-screen w-screen flex'>
        <section className='relative left flex flex-col h-full min-w-80 bg-slate-300'>
            <header className='flex justify-between items-center p-2 px-4 bg-slate-100 w-full absolute top-0'>
                <button onClick={()=>setIsModalOpen(!isModalOpen)} className='flex gap-2'>
                <i className="ri-add-line"></i>
                <p>add collaborator</p>
                </button>
                <button className='p-2' onClick={()=>setisSidePanelOpen(!isSidePanelOpen)}>
                    <i className="ri-group-fill"></i>
                </button>
            </header>

            <div className='conversation-area pt-14 pb-10 relative flex-grow flex flex-col h-full'>
                <div ref={messageBox} className='message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide'>
                    
                </div>
                <div className='inputField  flex absolute bottom-0 w-full'>
                    <input value={message} onChange={(e)=>setMessage(e.target.value)} className='p-2 px-4 border-none outline-none flex-grow' type='text' placeholder='enter the message'/>
                    <button onClick={send} className='px-3 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i></button>

                </div>

            </div>

            <div className={`side-panel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ?'translate-x-0':'-translate-x-full'} top-0 `}>
                <header className='flex justify-between items-center p-2 px-3 bg-slate-200'>
                    <h1 className='font-semibold text-lg'> Collaborators</h1>
                    <button onClick={()=>setisSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                    <i className="ri-close-line"></i>
                    </button>

                </header>
                <div className='users flex flex-col gap-2'>
                    {project.users && project.users.map(user=>{
                        return(
                            <div key={user._id || user.email} className='user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center'>
                                <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-4 text-white bg-slate-500'>
                                    <i className="ri-user-fill absolute"></i>
                                </div>
                                    <h1 className='font-semibold text-lg'>
                                        {user.email}
                                    </h1>
                            </div>
                        )
                    })}
                </div>

            </div>

        </section>
        {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className='bg-white p-4 rounded-md w-96 max-w-full relative'>
                    <header className='flex justify-between items-center mb-4'>
                        <p className='font-bold'>Select User</p>
                        <button onClick={()=>setIsModalOpen(!isModalOpen)}><i className="ri-close-line"></i></button>
                    </header>
                    <div className='user-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto'>
                        {users.map((user)=>(
                            <div key={user._id} onClick={()=>handleUserClick(user._id)} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUser).indexOf(user._id)!=-1?"bg-slate-200":""} p-2 flex gap-2 items-center`}>
                                <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                    <i className='ri-user-fill absolute'></i>
                                </div>
                                <h1 className='text-lg font-semibold'>{user.email}</h1>
                            </div>
                        ))}
                    </div>
                    <button onClick={addCollaborators} className='absolute bottom-4 bg-blue-600 rounded-full left-1/2 transform -translate-x-1/2 px-4 py-2'>Add Collaborators</button>

                </div>

            </div>
        )}

    </main>
  )
}

export default Project;