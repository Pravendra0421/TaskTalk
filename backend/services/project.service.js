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