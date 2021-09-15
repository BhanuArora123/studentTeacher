const mongoose = require("mongoose");

const schema = mongoose.Schema;

const studentSchema = new schema(
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
        fav_teachers: [
            {
                teacherId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "teacher"
                }
            }
        ]
    }
)
module.exports = mongoose.model("student", studentSchema);