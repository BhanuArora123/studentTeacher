const studentModel = require("../models/students");
const teacherModel = require("../models/teachers.js");
const { validationResult } = require("express-validator");
exports.addFavourite = (req,res,next) => {
    let fav_teacher = req.body.teacher;
    let studentData;
    studentModel.findOne({
        email:req.email
    })
    .then((stud) => {
        if(!stud){
            return res.status(404).json({
                msg:"not found"
            })
        }
        studentData = stud;
        return teacherModel.findOne({
            email:fav_teacher
        })
    })
    .then((teacher) => {
        studentData.fav_teachers.push({
            teacherId:teacher._id
        })
        studentData.save();
        teacher.students_liked.push({
            studId:studentData._id
        })
        teacher.save();
    })
    .then(() => {
        return res.status(200).json({
            msg:"teacher added to favourite successfully"
        });
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.mostFav = (req,res,next) => {
    // using aggregations to find most favourite teacher
    studentModel
    .find()
    .populate("fav_teacher.teacherId")
    .aggregate({
        $expr:{
            $max:[
                {
                    $size:"$fav_teachers"
                }
            ]
        }
    })
    .then((val) => {
        return res.status(200).json({
            fav_teacher:{
                ...val._doc,password:undefined
            }
        })
    })
}
exports.removeTeacher = (req,res,next) => {
    let teacherId = req.params.teacherId;
    studentModel.findOne({
        email:req.email
    })
    .then((stud) => {
        let modifiedData = stud.fav_teachers.filter((teacher) => {
            if(teacher._id.toString() != teacherId.toString()){
                return teacher;
            }
        })
    })
}