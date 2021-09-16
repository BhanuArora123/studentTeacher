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
        console.log(teacher);
        studentData.fav_teachers.push({
            teacherId:teacher._doc._id
        })
        studentData.save();
        teacher.students_liked.push({
            studId:studentData._id
        })
        return teacher.save();
    })
    .then((teacherData) => {
        return res.status(200).json({
            msg:"teacher added to favourite successfully",
            teacherData:{
                ...teacherData._doc,password:undefined
            }
        });
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.mostFav = (req,res,next) => {
    // using aggregations to find most favourite teacher
    teacherModel
    .aggregate([{
        $expr:{
            $max:[
                {
                    $size:"$fav_teachers"
                }
            ]
        }
    }])
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
    console.log(teacherId);
    studentModel.findOne({
        email:req.email
    })
    .then((stud) => {
        let modifiedData = stud.fav_teachers.filter((teacher) => {
            if(teacher.teacherId.toString() != teacherId.toString()){
                return teacher;
            }
        })
        console.log(modifiedData)
        stud.fav_teachers = modifiedData;
        return stud.save();
    })
    .then(() => {
        return res.status(200).json({
            msg:"deleted"
        })
    })
}
exports.getTeacher = (req,res,next) => {
    teacherModel.find()
    .then((arr) => {
        let teacherArray = arr.map((teacher) => {
            return {
                ...teacher._doc,password:undefined
            }
        })
        return res.status(200).json({
            teacherData:teacherArray
        })
    })
}
exports.favTeacher = (req,res,next) => {
    studentModel.findOne({
        email:req.email
    })
    .populate("fav_teachers.teacherId","name email _id")
    .then((userData) => {
        return res.status(200).json({
            userData:{
                ...userData._doc,password:undefined
            }
        })
    })
}