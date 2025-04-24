import { projectService,getAllProjectByUserId,addUsersToProject,getProjectsById} from "../services/project.service.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
export const createProject =async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    try {
            
        const {name}=req.body;
        const loggedInUser = await userModel.findOne({email:req.user.email})
        const userId = loggedInUser._id;
        const newProject = await projectService({name,userId});
        res.status(201).json(newProject);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }

}

export const getAllProject = async(req,res)=>{
    try {
        const loggedInUser= await userModel.findOne({email:req.user.email});
        const allUserProjects= await getAllProjectByUserId({
            userId:loggedInUser._id
        })
        return res.status(200).json({projects:allUserProjects});
        
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message)
    }
}

export const addUserToProject = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    try {
        const {projectId,users} = req.body;
        const loggedInUser = await userModel.findOne({
            email:req.user.email
        })
        const project = await addUsersToProject({
            projectId,
            users,
            userId:loggedInUser
        })
        return res.status(200).json({
            project,
        })
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message)
    }
}

export const getProjectById = async(req,res)=>{
    try {
        const {projectId}=req.params;
        const project = await getProjectsById({
            projectId
        });
        return res.status(200).json({
            project
        });
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message)
    }
}

export const updateFileTree = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, fileTree } = req.body;

        const project = await projectService.updateFileTree({
            projectId,
            fileTree
        })

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}