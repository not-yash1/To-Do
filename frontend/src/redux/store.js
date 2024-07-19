import { configureStore } from '@reduxjs/toolkit'
import { addTaskReducer, adminAuthReducer, deleteTaskReducer, getAllTasksReducer, getTaskReducer, updateTaskReducer } from './Reducers/AdminReducer'
import { deleteTask } from './Actions/AdminActions';


const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        addTask: addTaskReducer,
        getTasks: getAllTasksReducer,
        getTask: getTaskReducer,
        updateTask: updateTaskReducer,
        deleteTask: deleteTaskReducer
    }
});

export default store;