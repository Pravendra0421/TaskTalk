import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/user.context';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../config/axios.js"
const Home = () => {
  const [isModelOpen,setIsModalOpen]=useState(false);
  const navigate = useNavigate();
  const [projectName,setProjectName]=useState('');
  const [project,setProject]=useState([]);
  function createProject(e){
    e.preventDefault();
    console.log({projectName});
    axios.post('/project/create',{
      name:projectName
    }).then((res)=>{
      console.log(res.data);
      setIsModalOpen(false);
    }).catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    axios.get('/project/all')
    .then((res)=>{
      setProject(res.data.projects);
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <main className='p-4'>
      <div className='projects flex flex-wrap gap-3'>
        <button onClick={()=>setIsModalOpen(true)} className='project p-4 border border-slate-300 rounded-md'>
          New Project 
        <i className="ri-link ml-2"></i>
        </button>
      {
        project.map((project)=>(
          <div key={project._id} onClick={()=>navigate('/project',{state:{project}})} className='project flex flex-col gap-2 p-4 min-w-36 hover:bg-slate-300 cursor-pointer border border-slate-300 rounded-md'>
            <h1 className='font-bold'>{project.name}</h1>
            <div className='flex gap-2'>
              <p>
              <small><i className="ri-user-line"></i>Collaborators:</small>
              </p>
              {project.users.length}
            </div>
          </div>
        ))
      }
      </div>
      {isModelOpen &&(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-md shadow-md w-1/3'>
            <h2 className='text-xl mb-4'>Create New Project</h2>
            <form onSubmit={createProject}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Project Name</label>
                <input onChange={(e)=>setProjectName(e.target.value)} value={projectName} type='text' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' required/>
              </div>
              <div className='flex justify-center'>
                <button type='button' className='mr-2 px-4 py-2 bg-gray-300 rounded-md' onClick={()=>setIsModalOpen(false)}>cancel</button>
                <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-md'>
                  Create
                </button>

              </div>

            </form>
          </div>

        </div>
      )}

    </main>
  )
}

export default Home;