const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    image : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    link : {
        type : String,
        required : true
    },
    technologies : [
        {
        name : {
            type : String
        },
        image : {
            type : String
        }
    }
   ]
});

module.exports = mongoose.model("Project",projectSchema);