const studentModel = require("../models/students");
const teacherModel = require("../models/teachers.js");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const bcryptjs = require("bcryptjs");

exports.signup = (req,res,next) => {
    const accountType = req.body.accountType;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            msg:errors.array()
        })
    }
    let reqModel = studentModel;
    if(accountType == "teacher"){
        reqModel = teacherModel;
    }
    reqModel.findOne({email:email})
    .then((stud) => {
        if(stud){
            return res.status(409).json({
                msg:"student/teacher already exists"
            })
        }
    })
    .catch(err => console.log(err));

    bcryptjs.hash(password,12)
    .then((result) => {
        let signupCred = new reqModel({
            name:req.body.name,
            email:email,
            password:result,
            phone_number:req.body.phone
        });
        return signupCred.save();
    })
    .then((stud) => {
        return res.status(201).json({
            msg:"student/teacher created successfully"
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body.accountType;
    const userId,studentData;
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            msg:errors.array()
        })
    }
    let reqModel = studentModel;
    if(accountType == "teacher"){
        reqModel = teacherModel;
    }
    reqModel.findOne({
        email:email
    })
    .then((stud) => {
        if(stud){
            return res.status(404).json({
                msg:"student/teacher not found"
            })
        }
        userId = stud._id;
        studentData = stud;
        return bcryptjs.compare(password,stud.password)
    })
    .then((result) => {
        if(!result){
            return res.status(401).json({
                msg:"invalid Password"
            })
        }
        let token = jwt.sign({
            email:email,
            userId:userId
        },"supersecretsentence");
        return res.status(200).json({
            msg:"user authenticated successfully",
            userData:{
                ...studentData,
                password:undefined
            },
            token:token
        })
    })
    .catch((err) => {
        console.log(err);
    })
}