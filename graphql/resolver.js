const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/projects');
const upload = require('../middleware/upload');
const multer = require('multer');

module.exports = {
    createUser : async function({userInput},req){
        const existingUser = await User.findOne({email : userInput.email});
        if(existingUser){
            const error = new Error("User exist already.");
            throw error;
        }
        const hashedPw = await bcrypt.hash(userInput.password,12);
        const user = new User({
            email : userInput.email,
            name : userInput.name,
            password : hashedPw
        })
        const createdUser = await user.save();
        return {...createdUser._doc,_id : createdUser._id.toString()}
    },
    login : async function({email,password}){
        const user = await User.findOne({email : email});
        if(!user){
            const error = new Eror("User is not registered");
            throw error;
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            const error = new Error("User is Unauthorized.");
            throw error;
        }
        const token = jwt.sign({email:email,userId:user._id.toString},'secret',{expiresIn:'1h'});
        return {token:token,userId:user._id.toString()};
    },
    createProject : async function({projectInput},req){
            upload(req,res,async function(err){
                try{
                if(err instanceof multer.MulterError){
                    return next(err);
                }else if(err){
                    return next(err);
                }
    
                const image = projectInput.image.path;
                const title = projectInput.title;
                const description = projectInput.description;
                const link = projectInput.link;
                const technologies = {
                    name : projectInput.name,
                    images : projectInput.images
                }
                const newProject = new Project({
                    image : image,
                    title : title,
                    description : description,
                    link : link,
                    technologies : technologies
                });
                const createdProject = await newProject.save();
                return {...createdProject._doc, _id:createdProject._id.toString()}
            }catch(error){
            return next(error);
        }
      })
    },
    project : async function({_id}){
        const existProject = await Project.findOne({_id:_id});
        if(!existingProject){
            const error = new Error("Project doesnt exist.");
            throw error;
        }
        return {_id:existProject._id.toString(),title:existProject.title,description : existProject.description,link:existProject.link,technologies : existProject.technologies};
    },

    updateProject : async function({_id,projectInput},req){
        upload(req,res,async function(err){
            try{
            if(err instanceof multer.MulterError){
                return next(err);
            }else if(err){
                return next(err);
            }
            const existProject = await Project.findOne({_id:_id});
            if(!existProject){
                const error = new Error("No Project.");
                throw error;
            }
            existProject.image = projectInput.image.path;
            existProject.title = projectInput.title;
            existProject.description = projectInput.description;
            existProject.link = projectInput.link;
            existProject.technologies = {
                name : projectInput.name,
                images : projectInput.images
            }
            const updatedProject = await updateProject.save();
            return {...updatedProject._doc, _id:updatedProject._id.toString()}
        }catch(error){
        return next(error);
        }
      })
    },

    deleteProject : async function({_id},req){
        const deletedProject = await Project.findOne({_id:_id});
        if(!deletedProject){
            const error = new Error("No Project.");
            throw error;
        }
        const del = await deleteProject.deleteOne(deletedProject);
        return {del};
    }
}