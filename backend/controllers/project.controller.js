import { projectService,getAllProjectByUserId} from "../services/project.service.js";
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
