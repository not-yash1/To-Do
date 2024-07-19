import axios from "axios"

const serverUrl = "http://localhost:6001/api/v1"
// const serverUrl = "https://fin-backend-14d0.onrender.com/api/v1/admin"

export const loginAdmin = (email, password) => async(dispatch) =>{

    try {
        dispatch({
            type: "AdminLoginRequest"
        });

        const {data} = await axios.post(`${serverUrl}/login`, {email, password}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "AdminLoginSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "AdminLoginFailure",
            payload: error.response.data.message
        })
        
    }
}

export const logoutAdmin = () => async(dispatch) => {
    try {
        dispatch({
            type: "LogoutAdminRequest",
        });

        const {data} = await axios.get(`${serverUrl}/logout`, {
            withCredentials: true,
        });

        dispatch({
            type: "LogoutAdminSuccess",
        })
        
    } catch (error) {

        dispatch({
            type: "LogoutAdminFailure",
            payload: error.response.data.message
        })
    }
}

export const loadAdmin = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadAdminRequest",
        });

        const {data} = await axios.get(`${serverUrl}/me`, {
            withCredentials: true,
        });

        dispatch({
            type: "LoadAdminSuccess",
            payload: data.admin
        })
    } catch (error) {
        dispatch({
            type: "LoadAdminFailure",
            payload: error.response.data.message
        })
    }
}

export const addTask = (title, desc, status) => async(dispatch) => {
    try {
        dispatch({
            type: "AddTaskRequest",
        });

        const {data} = await axios.post(`${serverUrl}/task/add`, {title, desc, status}, {
            withCredentials: true,
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "AddTaskSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "AddTaskFailure",
            payload: error.response.data.message
        })
    }
}

export const getAllTasks = () => async(dispatch) => {
    try {
        dispatch({
            type: "GetAllTasksRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/tasks`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetAllTasksSuccess",
            payload: data.tasks
        })
    } catch (error) {
        dispatch({
            type: "GetAllTasksFailure",
            payload: error.response.data.message
        })
    }
}

export const getTask = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "GetTaskRequest",
        });

        const {data} = await axios.get(`${serverUrl}/task/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetTaskSuccess",
            payload: data.task
        })
    } catch (error) {
        dispatch({
            type: "GetTaskFailure",
            payload: error.response.data.message
        })
    }
}

export const updateTask = (title, desc, status, id) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateTaskRequest",
        });

        const {data} = await axios.put(`${serverUrl}/task/${id}`, {title, desc, status}, {
            withCredentials: true,
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "UpdateTaskSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateTaskFailure",
            payload: error.response.data.message
        })
    }
}

export const deleteTask = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateTaskRequest",
        });

        const {data} = await axios.delete(`${serverUrl}/task/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateTaskSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateTaskFailure",
            payload: error.response.data.message
        })
    }
}
