// models/Task.js

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    points: Number,
    bonus: {
        name: String,
        points: Number,
    },
    type: String, // daily, bonus, special
    priority: Number,
})

module.exports = Task = mongoose.model('task', TaskSchema);