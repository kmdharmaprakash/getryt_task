const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");
const Employee = require("../models/EmployeeModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const EmployeeService = () => {
  const registerService = async (req, res) => {
    try {
      const passwordHash = await bcrypt.hash(req.password, 8);
      req.password = passwordHash;
      const newEmployee = new Employee(req);
      const savedUser = await newEmployee.save();
      return savedUser;
    } catch (err) {
      res.json({
        error: "error on register service",
      });
    }
  };
  const loginService = async (req, res) => {
    try {
        console.log("req--", req);
        let email = req.email;
        let password = req.password;
        console.log("email", email);
        console.log("password", password);
        let user = await Employee.findOne({email: email});
        console.log("user", user);
        if(!user) {
            res.status(400).json({
                message: "You not yet registered"
            })
        } else {
            console.log("else----")
            console.log("user-----", user);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                  res.status(400).json({
                    err,
                    message: "Password didn't match",
                  });
                }
                if (result) {
                    console.log("result", result);
                  let token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: '7d',
                    }
                  );
                  console.log("token", token);
                  res.status(200).json({
                    message: "Logged In Successfully",
                    token: token,
                    data: user,
                  });
                } else {
                  res.status(400).json({
                    message: "Password Incorrect",
                  });
                }
              });
        }
    }catch(err){
        res.status(400).json({
            message: "Error on login"
        })
    }
  }
  const viewEmployee = async (req, res) => {
    try {
        console.log("REq", req)
        let employee = await Employee.findById({_id: req});
        console.log("employeee", employee)
            res.status(200).json({
                message: "data fetched succesfully",
                data: employee
            })
    } catch(err) {
        res.json({
            message: "Error on view employee"
        })
    }
  }
  const viewAllemployees = async (req, res) => {
    try {
        let output = await Employee.find({});
        return output;
    } catch(err) {
        res.json({
            message: "Error on viewAllemployees"
        })
    }
  };
  const updateEmployee = async (req, res) => {
    try {
        console.log("req / updteEmployee", req);
        let id = req._id;
        let output = await Employee.findByIdAndUpdate({_id: id}, {$set: req}, {new: true})
        console.log("output", output)
        return output;
    } catch(err) {
        res.json({
            message: "error on updateemployee"
        })
    }
  }
  const deleteEmployee = async (req, res) => {
    try {
        console.log("req", req);
        let id = req;
        let output = await Employee.findOneAndDelete({_id: id});
        return output;
    } catch(err) {
        res.json({
            message: "error on delete Employee"
        })
    }
  }
  return {
    registerService,
    loginService,
    viewEmployee,
    viewAllemployees,
    updateEmployee,
    deleteEmployee
  };
};

module.exports = EmployeeService();
