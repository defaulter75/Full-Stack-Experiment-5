const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be positive']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  __v: {
    type: Number,
    select: false
  }
}, {
  timestamps: true,
  versionKey: '__v'
});

module.exports = mongoose.model('Student', studentSchema);