import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

const skillsReducer = createReducer(initialState,{
	getSkillReq: (state) => {
		state.loading = true;
	},
	skillGetSuc : (state, action) => {
		state.loading = false;
		state.skills = action.payload
	},
	skillGetFai : (state, action) => {
		state.loading = false;
		state.error = action.payload
	},
	getProjectReq: (state) => {
		state.loading = true;
	},
	projectGetSuc : (state, action) => {
		state.loading = false;
		state.project = action.payload
	},
	projectGetFai : (state, action) => {
		state.loading = false;
		state.error = action.payload
	},
	getPostReq: (state) => {
		state.loading = true;
	},
	postGetSuc : (state, action) => {
		state.loading = false;
		state.post = action.payload
	},
	postGetFai : (state, action) => {
		state.loading = false;
		state.error = action.payload
	},
	creMessReq: (state) => {
		state.loading = true;
	},
	creMesSuc : (state, action) => {
		state.loading = false;
		state.message = action.payload
	},
	creMesFai : (state, action) => {
		state.loading = false;
		state.error = action.payload
	},
	creCountReq: (state) => {
		state.loading = true;
	},
	creCountSuc : (state, action) => {
		state.loading = false;
		state.count = action.payload
	},
	creCountFai : (state, action) => {
		state.loading = false;
		state.error = action.payload
	},
	clearErr : (state) => {
		state.error = '';
	},
	clearMess : (state) => {
		state.message = '';
	}

});

export default skillsReducer;