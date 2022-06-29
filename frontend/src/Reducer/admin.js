import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

const adminReducer = createReducer(initialState,{
	loginRequest : (state) => {
		state.loading = true;
	},
	loginSucess : (state,action) => {
		state.loading = false;
		state.isAdmin = true;
		state.admin = action.payload
	},
	loginFail : (state,action) => {
		state.loading = false;
		state.isAdmin = false;
		state.error = action.payload
	},
	loadAdminRequest : (state) => {
		state.loading = true;
	},
	loadAdminSucess : (state,action) => {
		state.loading = false;
		state.isAdmin = true;
		state.admin = action.payload
	},
	loadAdminFail : (state,action) => {
		state.loading = false;
		state.isAdmin = false;
		// state.message = action.payload
	},
	CreateSkillsRequest : (state) => {
		state.loading = true;
	},
	CreateSkillsSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	CreateSkillsFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	updateSkillsRequest : (state) => {
		state.loading = true;
	},
	updateSkillsSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	updateSkillsFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	deleteSkillsRequest : (state) => {
		state.loading = true;
	},
	deleteSkillsSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	deleteSkillsFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	createProjectRequest : (state) => {
		state.loading = true;
	},
	createProjectSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	createProjectFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	updateProjectRequest : (state) => {
		state.loading = true;
	},
	updateProjectSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	updateProjectFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	deleteProjectRequest : (state) => {
		state.loading = true;
	},
	deleteProjectSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	deleteProjectFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	createCountRequest : (state) => {
		state.loading = true;
	},
	createCountSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	createCountFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	deleteCountRequest : (state) => {
		state.loading = true;
	},
	deleteCountSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	deleteCountFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	updateCountRequest : (state) => {
		state.loading = true;
	},
	updateCountSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	updateCountFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	getMessageRequest : (state) => {
		state.loading = true;
	},
	getMessageSucess : (state,action) => {
		state.loading = false;
		state.clientMessage = action.payload
	},
	getMessageFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	deleteMessageRequest : (state) => {
		state.loading = true;
	},
	deleteMessageSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	deleteMessageFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	updateAdminRequest : (state) => {
		state.loading = true;
	},
	updateAdminSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	updateAdminFail : (state,action) => {
		state.loading = false;
		state.error = action.payload;
	},
	changePassRequest : (state) => {
		state.loading = true;
	},
	changePassSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload;
	},
	changePassFail : (state,action) => {
		state.loading = false;
		state.error = action.payload;
	},
	logoutAdminRequest : (state) => {
		state.loading = true;
	},
	logoutAdminSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload;
		state.isAdmin = false;
		state.admin = '';
	},
	logoutAdminFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	createPostRequest : (state) => {
		state.loading = true;
	},
	createPostSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	createPostFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	deletePostRequest : (state) => {
		state.loading = true;
	},
	deletePostSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	deletePostFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	updatePostRequest : (state) => {
		state.loading = true;
	},
	updatePostSucess : (state,action) => {
		state.loading = false;
		state.message = action.payload
	},
	updatePostFail : (state,action) => {
		state.loading = false;
		state.error = action.payload
	},
	clearMessage : (state) => {
		state.message = '';
	},
	clearError : (state) => {
		state.error = '';
	}

});

export default adminReducer;