import axios from 'axios';

// get skills
export const getSkill = () => async (dispatch) => {
	try {
		dispatch({
			type : "getSkillReq"
		});

		const { data } = await axios.get("/api/v1/skills");

		dispatch({
			type : "skillGetSuc",
			payload : data
		});

	}catch(err){
		dispatch({
			type : "skillGetFai",
			payload : err.response.data.message
		});
	}
}

// create skills
export const createSkill = (Name,Percentage) => async (dispatch) => {
	try {
		dispatch({
			type : "CreateSkillsRequest"
		});

		const { data } = await axios.post("/api/v1/skills/",{Name,Percentage});

		dispatch({
			type : "CreateSkillsSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "CreateSkillsFail",
			payload : err.response.data.message
		});
	}
}

// update skills
export const updateSkill = (_id,Name,Percentage) => async (dispatch) => {
	try {
		dispatch({
			type : "updateSkillsRequest"
		});

		const { data } = await axios.put(`/api/v1/skills/${_id}`,{Name,Percentage});

		dispatch({
			type : "updateSkillsSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "updateSkillsFail",
			payload : err.response.data.message
		});
	}
}

// delete skills
export const deleteSkill = (_id) => async (dispatch) => {
	try {
		dispatch({
			type : "deleteSkillsRequest"
		});

		const { data } = await axios.delete(`/api/v1/skills/${_id}`);

		dispatch({
			type : "deleteSkillsSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "deleteSkillsFail",
			payload : err.response.data.message
		});
	}
}




export const scroll = (className) => {
		const element = document.querySelector(className);
		element.scrollIntoView({ behavior: "smooth" });

	}