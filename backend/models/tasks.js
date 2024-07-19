import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "To Do",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Task = mongoose.model("Task", taskSchema);