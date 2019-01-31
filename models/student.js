const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {type: String, required: [true, "Pleae enter Student Name!"]},
    age: {type: Number, min: 25, max: 70},
    course: {type: String, enum: ['FBW1','FBW2','FBW3','FBW4']},
    school: {
        type: Schema.Types.ObjectId,
        ref: "School"
    }
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;