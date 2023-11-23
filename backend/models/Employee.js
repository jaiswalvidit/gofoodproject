const mongoose=require('mongoose');

const employeeSchema= new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
lists:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
],
},{timestamps:true});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;