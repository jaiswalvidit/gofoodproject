const mongoose=require('mongoose');
const {Schema}=mongoose;
const customerSchema= new Schema(
    {
        name:{
            type:String,
            required:[true,'mandatory to input'],
            unique:true,
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        customer_list:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],

        
    },{timestamps:true}
)

const Customer=mongoose.model('Customer',customerSchema);
module.exports=Customer;