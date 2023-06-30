const express = require("express");
const Employee = require("../models/EmployeeModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const EmployeeService = require("../services/EmployeeService");


const EmployeeController = () => {
  const registerEmployee = async (req, res) => {
    try {
      const signupData = req.body;
      if (!signupData.email || !signupData.password || !signupData.name) {
        return res.status(400).json({
          errorMessage: "Please enter all the fields",
        });
      }
      const existingUser = await Employee.findOne({ email: signupData.email });
      if (existingUser)
        return res.status(400).json({
          errorMessage: "An account with this email already exists",
        });
      console.log("controller 2")
      let output = await EmployeeService.registerService(signupData);
      res.json({
        message: "Registered successfully",
        data: output
      });
    } catch (err) {
        return res.status(400).json({
            message: "Error on register user",
            error: err
        })
    }
  };
  const loginEmployee = async (req, res) => {
    try {
        let userInput = req.body;
        await EmployeeService.loginService(userInput);
    } catch (err) {
        res.status(400).json({
            message: "Error on login user"
        })
    }
  };
  const viewEmployee = async (req, res) => {
    try {
      let id = req.body.id;
      let output = await EmployeeService.viewEmployee(id);
      console.log("otuput", output)
      res.json({
        message: "data showed successfully",
        data: output
      })
    } catch(err) {
      res.status(400).json({
        message: "Error on view employee"
      })
    }
  }
  const viewAllEmployee = async (req, res) => {
    try {
      let output = await EmployeeService.viewAllemployees();
      res.json({
        data: output
      })
    } catch(err) {
      res.json({
        message: "Error on view all employee"
      })
    }

  }
  const updateEmployee = async (req, res) => {
    try {
        let data = req.body;
        let output = await EmployeeService.updateEmployee(data);
        res.json({
          message: "updated succesfully",
          data: output
        })
    } catch(err) {
      res.json({
        message: "error on update employee"
      })
    }
  }
  const deleteEmployee = async (req, res) => {
    try {
      let id = req.id;
      let output = await EmployeeService.deleteEmployee(id);
      res.json({
        message: "Deleted succesfully",
        data: output
      })
  } catch(err) {
    res.json({
      message: "error on update employee"
    })
  }
  }

  return {
    registerEmployee,
    loginEmployee,
    viewEmployee,
    viewAllEmployee,
    updateEmployee,
    deleteEmployee
  };
};

module.exports = EmployeeController();
