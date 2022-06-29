import axios from 'axios';

// get project
export const getProject = () => async (dispatch) => {
	try {
		dispatch({
			type : "getProjectReq"
		});

		const { data } = await axios.get("/api/v1/projects");

		dispatch({
			type : "projectGetSuc",
			payload : data
		});

	}catch(err){
		dispatch({
			type : "projectGetFai",
			payload : err.response.data.message
		});
	}
}

// create project
export const createProject = (Number,Link,Image,Category) => async (dispatch) => {
	try {
		dispatch({
			type : "createProjectRequest"
		});

		const { data } = await axios.post("/api/v1/projects",{Number,Link,Image,Category});

		dispatch({
			type : "createProjectSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "createProjectFail",
			payload : err.response.data.message
		});
	}
}

// update project
export const updateProject = (_id,Number,Link,Image,Category) => async (dispatch) => {
	try {
		dispatch({
			type : "updateProjectRequest"
		});

		const { data } = await axios.put(`/api/v1/projects/${_id}`,{Number,Link,Image,Category});

		dispatch({
			type : "updateProjectSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "updateProjectFail",
			payload : err.response.data.message
		});
	}
}

// delete project
export const deleteProject = (_id) => async (dispatch) => {
	try {
		dispatch({
			type : "deleteProjectRequest"
		});

		const { data } = await axios.delete(`/api/v1/projects/${_id}`);

		dispatch({
			type : "deleteProjectSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "deleteProjectFail",
			payload : err.response.data.message
		});
	}
}