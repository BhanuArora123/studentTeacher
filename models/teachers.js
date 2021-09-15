const mongoose = require("mongoose");

const schema = mongoose.Schema;

const teacherSchema = new schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone_number: {
            type: Number,
            required: true
        },
        students_liked: [
            {
                studId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "student"
                }
            }
        ]
    }
)
module.exports = mongoose.model("teacher", teacherSchema);