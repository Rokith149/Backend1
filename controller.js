let data=[];
function getStudentByRollno(req,res){
    console.log("[INFO] Entered Get Student Data");
    const rollno =req.body.rollno;
    const Student =data.find(Student=> Student.rollno === rollno)
    if(Student){
        console.log("[SUCCES] Student Found");
        res.status(200).send(Student);
    }else{
        console.log("[ERROR] Student Not Found");
        res.status(404).send("student not found")
    }
}
function getAllStudents(req, res) {
    console.log("[INFO] Entered into Get All Students");
    res.send(data);
}

function insertdata(req, res) {
    console.log("[INFO] Entered into Insert Data");
    let isDuplicate = checkIfdetailsPresent(req.body.rollno);
    if (!isDuplicate) {
        console.log("[INFO] No Duplicate Found");
        data.push(req.body);
        console.log("{SUCCESS Data Inserted Successfully");
        res.send("data recieved")
    }
    else{
        console.log("[INFO] Duplicate Found");
        res.send("Already Exists!!!!")}
    }
function checkIfdetailsPresent(rollno) {
    for (let i of data) {
        if (i.rollno === rollno) {
            return true;
        }
    }
    return false;
}
function deleteStudent(req,res){
    let rollno =req.body.rollno;
    let index =data.find(Student=> Student.rollno === rollno);
    if(index !== -1){
        data.splice(index,1);
        res.send("Student Deleted")
    }else{
        res.send("Student not found")
    }
}
function EditStudent(req,res){
    let rollno =req.body.rollno;
    let index =data.findIndex(Student=> Student.rollno === rollno);
    if(index !== -1){
        data[index]= req.body;
        res.send("Student Updated")
    }else{
        res.status(404).send("Student not found")
    }
}
module.exports ={getStudentByRollno,insertdata,deleteStudent,getAllStudents,EditStudent}