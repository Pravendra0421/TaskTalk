import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const projectService = async ({
    name,userId
})=>{
    if(!name){
        throw new Error('name is required')
    }
    if(!userId){
        throw new Error('user id is required')
    }
    let project;
    try {
        project = await projectModel.create({
            name,users:[userId]
        })
    } catch (error) {
        if(error.code === 11000){
            throw new Error('Project name is already exist');
        }
    }
    return project;
}

export const getAllProjectByUserId = async({userId})=>{
    if(!userId){
        throw new Error('UserId is required')
    }
    const allUserProjects = await projectModel.find({
        users:userId
    })
    return allUserProjects
}

export const addUsersToProject = async({projectId,users,userId})=>{
    if(!projectId){
        throw new Error("Project Id is required")
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId")
    }

    if(!users){
        throw new Error("USer is required")
    }
    if(!Array.isArray(users) || users.some(userId=>!mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("Invalid userId(s) in users Array")
    }
    if(!userId){
        throw new Error("User id is required")
    }
    const project = await projectModel.findOne({
        _id:projectId,
        users:userId
    })
    if(!project){
        throw new Error("user not belong to this project")
    }
    const updatedProject = await projectModel.findOneAndUpdate({
        _id:projectId
    },{
        $addToSet:{
            users:{
                $each:users
            }
        }
    },{
        new:true
    })
    return updatedProject;
}

export const getProjectsById=async({projectId})=>{
    if(!projectId){
        throw new Error("project id is required");
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId");
    }
    const project = await projectModel.findOne({
        _id:projectId
    }).populate('users')
    return project;
}