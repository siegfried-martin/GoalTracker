// models/User.js

const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    tasks: [{
        type: SchemaTypes.ObjectId,
        ref: "Task"
    }],
    total_daily_goal_weight: Number,
    completed_daily_goal_weight: Number,
    total_weekly_goal_weight: Number,
    completed_weekly_goal_weight: Number,
})

module.exports = User = mongoose.model('user', UserSchema);