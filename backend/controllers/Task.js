import { Task } from "../models/tasks.js";


export const addTask = async (req, res) => {
    try {
      const { title, desc, status } = req.body;
      
      const task = await Task.create({
        title,
        desc,
        status,
      })
  
      res.status(200).json({
          success: true, 
          message: "Task added successfully" 
      });
    } catch (error) {
      res.status(500).json({ 
          success: false, 
          message: error.message 
      });
    }
};

export const removeTask = async (req, res) => {
try {
    // const { taskId } = req.params;

    await Task.findByIdAndDelete(req.params.id);

    res
    .status(200)
    .json({ 
        success: true, 
        message: "Task removed successfully" 
    });

} catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
};

export const updateTask = async (req, res) => {
try {
    const { title, desc, status } = req.body;

    let task = await Task.findById(req.params.id);

    if(!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
    }

    if(title) task.title = title;
    if(desc) task.desc = desc;
    if(status) task.status = status;

    await task.save();

    res
    .status(200)
    .json({ 
        success: true, 
        message: "Task Updated successfully" 
    });
} catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}