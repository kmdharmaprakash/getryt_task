const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    date: {
        type: Date,
        default: new Date(),
    }
})

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;