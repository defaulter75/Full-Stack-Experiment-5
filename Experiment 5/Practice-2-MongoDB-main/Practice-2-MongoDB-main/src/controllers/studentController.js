const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-__v');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching students', 
      error: error.message 
    });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-__v');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching student', 
      error: error.message 
    });
  }
};

// Create new student
exports.createStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    
    const newStudent = new Student({
      name,
      age,
      course
    });
    
    const savedStudent = await newStudent.save();
    
    res.status(201).json({
      name: savedStudent.name,
      age: savedStudent.age,
      course: savedStudent.course,
      _id: savedStudent._id,
      __v: savedStudent.__v
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating student', 
      error: error.message 
    });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating student', 
      error: error.message 
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json({ 
      message: 'Student deleted',
      student: {
        _id: deletedStudent._id,
        name: deletedStudent.name,
        age: deletedStudent.age,
        course: deletedStudent.course
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting student', 
      error: error.message 
    });
  }
};