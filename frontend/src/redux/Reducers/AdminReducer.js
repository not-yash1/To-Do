import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {}

const AdminLoginRequest = createAction('AdminLoginRequest');
const AdminLoginSuccess = createAction('AdminLoginSuccess');
const AdminLoginFailure = createAction('AdminLoginFailure');

const LoadAdminRequest = createAction('LoadAdminRequest');
const LoadAdminSuccess = createAction('LoadAdminSuccess');
const LoadAdminFailure = createAction('LoadAdminFailure');

const LogoutAdminRequest = createAction('LogoutAdminRequest');
const LogoutAdminSuccess = createAction('LogoutAdminSuccess');
const LogoutAdminFailure = createAction('LogoutAdminFailure');

const UpdateTaskRequest = createAction('UpdateTaskRequest');
const UpdateTaskSuccess = createAction('UpdateTaskSuccess');
const UpdateTaskFailure = createAction('UpdateTaskFailure');

const DeleteTaskRequest = createAction('DeleteTaskRequest');
const DeleteTaskSuccess = createAction('DeleteTaskSuccess');
const DeleteTaskFailure = createAction('DeleteTaskFailure');

const AddTaskRequest = createAction('AddTaskRequest');
const AddTaskSuccess = createAction('AddTaskSuccess');
const AddTaskFailure = createAction('AddTaskFailure');

const GetAllTasksRequest = createAction('GetAllTasksRequest');
const GetAllTasksSuccess = createAction('GetAllTasksSuccess');
const GetAllTasksFailure = createAction('GetAllTasksFailure');

const GetTaskRequest = createAction('GetTaskRequest');
const GetTaskSuccess = createAction('GetTaskSuccess');
const GetTaskFailure = createAction('GetTaskFailure');

const clearErrors = createAction('clearErrors');
const clearMessage = createAction('clearMessage');

export const adminAuthReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(AdminLoginRequest, (state) => {
        state.loading = true;
    })
    .addCase(AdminLoginSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAdminAuthenticated = true;
    })
    .addCase(AdminLoginFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdminAuthenticated = false;
    })
    .addCase(LoadAdminRequest, (state) => {
        state.loading = true;
    })
    .addCase(LoadAdminSuccess, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAdminAuthenticated = true;
    })
    .addCase(LoadAdminFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdminAuthenticated = false;
    })
    .addCase(LogoutAdminRequest, (state) => {
        state.loading = true;
    })
    .addCase(LogoutAdminSuccess, (state, action) => {
        state.loading = false;
        state.admin = null;  
        state.isAdminAuthenticated = false;
        state.message = action.payload
    })
    .addCase(LogoutAdminFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdminAuthenticated = true;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const addTaskReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(AddTaskRequest, (state) => {
        state.loading = true;
    })
    .addCase(AddTaskSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(AddTaskFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getAllTasksReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetAllTasksRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetAllTasksSuccess, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
    })
    .addCase(GetAllTasksFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getTaskReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetTaskRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetTaskSuccess, (state, action) => {
        state.loading = false;
        state.task = action.payload;
    })
    .addCase(GetTaskFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updateTaskReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdateTaskRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateTaskSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateTaskFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const deleteTaskReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(DeleteTaskRequest, (state) => {
        state.loading = true;
    })
    .addCase(DeleteTaskSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(DeleteTaskFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})