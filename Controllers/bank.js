import Bank from "../Models/bank.js";

export const bank = async(req,res) => {
    try{
        const {EmployeeID,Name,AccountNo,Branch,IFSC,PF,ESICNO} = req.body;

        //if all data not came
        if(!EmployeeID ||!Name || !AccountNo || !Branch ||!IFSC || !ESICNO || !PF ){
            return res.status(500).json({
                status : true,
                message : "Fill all the details",
            })
        }

        //check for alredy existing details
        const empExist = await Bank.findOne({EmployeeID});
        
        if(empExist){
            return res.status(409).json({
                status : true,
                message : "Details available already"
            })
        }

        const newdata = new Bank({
            EmployeeID,Name,AccountNo,Branch,IFSC,PF,ESICNO
        });

        const response = await newdata.save(newdata);

        return res.status(201).json({
            status : true,
            message : "Bank details Saved",
            data : response,
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status : false,
            Error : err.message,
        })
    }
}