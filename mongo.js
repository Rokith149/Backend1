const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log("DB connection Error:",err))
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    rollno: String
});
const Student = mongoose.model("Student",studentSchema)

app.post('/insert', async (req,res)=>{
    const {name,age,department,rollno} = req.body;
    const newStudent = new Student({name,age,department,rollno});
    try{
        await newStudent.save();
        res.status(201).send("Student inserted");
    } catch(error) {
        res.status(400).send("Error inserting student");
    }
})
app.get('/getAllStudents', async (req,res)=>{
    try{
        const data =await Student.find();
        res.send(data);
    } catch (error){
        res.status(500).send("Error fetching students")
    }
});

app.get('/getStudentByRollno', async (req,res)=>{
    try{
        const {rollno} = req.body;
        const data =await Student.findOne({rollno});
        if(data){
            res.send(data);
        }else{
            res.status(404).send("Student not found`")
        }
    } catch (error){
        res.status(500).send("Error fetching students")
    }
});

app.get('/paramscheck/:rollno', async (req,res)=>{
    try{ 
        console.log("n")
        const {rollno} = req.params;
        const data =await Student.findOne({rollno});
        if(data){
            res.send(data);
        }else{
            res.status(404).send("Student not found`")
        }
    } catch (error){
        res.status(500).send("Error fetching students")
    }
});

app.get('/getStudentbyQuery', async (req,res)=>{
    try{
        const {rollno} = req.query;
        const data =await Student.findOne({rollno});
        if(data){
            res.send(data);
        }else{
            res.status(404).send("Student not found`")
        }
    } catch (error){
        res.status(500).send("Error fetching students")
    }
});

app.delete('/deleteStudent', async(req,res)=>{
    const {rollno}= req.body;
    try{
        const deleteCount = await Student.deleteOne({rollno}) //findOneAndDelete
        console.log(deleteCount,rollno)
        if(deleteCount.deletedCount>0){
            res.send("Student deleted")
        }else{
            res.status(404).send("Student not found")
        }
    }
    catch(err){
        res.send("Error in deleting")
    }
})
app.put('/updatedStudent', async (req,res)=>{
    const {rollno,name,age,department} = req.body;
    try{
        const updatedStudent = await Student.findOneAndUpdate({rollno},{name,age,department},{new:true})
        if(updatedStudent){
            req.send("Student updated")
        }else{
            res.status(404).send("Student not found")
        }
    }catch(error){
        res.status(500).send("Error Updating")
    }
})
app.listen(4000)