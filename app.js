const express = require('express')
const controller = require('./controller')
const app = express();
app.use(express.json());
app.post('/insert', controller.insertdata);
app.get('/getAllStudents', controller.getAllStudents);
app.get('/getStudentByRollno', controller.getStudentByRollno);
app.delete('/delete', controller.deleteStudent);
app.put('/editStudent',controller.EditStudent);

app.get('/paramscheck/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("params checked")
})
app.get('/querycheck',(req,res)=>{
    console.log(req.qurey);
    res.send("Qurey")
})
app.listen(3000)