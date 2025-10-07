const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET all students
router.get('/students', studentController.getAllStudents);

// GET student by ID
router.get('/students/:id', studentController.getStudentById);

// POST create new student
router.post('/students', studentController.createStudent);

// PUT update student
router.put('/students/:id', studentController.updateStudent);

// DELETE student
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;