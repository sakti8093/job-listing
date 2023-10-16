const mongoose=require('mongoose')
const job= mongoose.model('job',{
    companyName:String,
    logoUrl:String,
    position:String,
    salary:String,
    jobType:String,
    remote:String,
    location:String,
    description:String,
    about:String,
    skillsRequired:Array,
    recruiterName:String
})
module.exports=job