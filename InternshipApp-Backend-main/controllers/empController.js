const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addEmployee = [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
      name,
      email,
      password,
      degree,
      experience,
      mobileNumber,
      role,
      city,
      state,
      joiningDate,
      address,
      isActive,
    } = req.body;
    const formattedJoiningDate = new Date(joiningDate).toISOString();
    const hashedPassword = bcrypt.hash(password,10)
    try {
      const internData = await prisma.employee.create({
        data: {
          name,
          email,
          password,
          degree,
          experience,
          mobileNumber,
          role,
          city,
          state,
          joiningDate: formattedJoiningDate,
          address,
          isActive,
        },
      });
      res.status(200).json(internData);
    } catch (error) {
      console.error("Error creating intern data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.getEmployees = async (req, res) => {
  try {
    const allDetails = await prisma.employee.findMany();
    res.status(200).json(allDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

exports.getEmployee = async (req, res) => {
  const { id } = req.params; // Assume ID is passed as a URL parameter

  try {
    // Convert the ID to an integer
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const singleData = await prisma.employee.findUnique({
      where: {
        id: numericId,
      },
    });

    if (!singleData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(singleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRecord = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Item deleted successfully!", itemId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
