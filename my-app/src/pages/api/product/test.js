import Exam from "@/models/test.model";
import { connectDatabase } from "../../../../utils/db";
connectDatabase();

const TestHandler=async(req,res)=>{
  
    try{

        const test=await Exam.find();
        console.log(test)
        res.status(201).json({
        success: true,
        message: "Test data.",
        data:test,
      })
    }catch(err){
        console.log(err)
         res.status(401).json({
            success: false,
            message: "Error.",
          });

    }

}

export default TestHandler

