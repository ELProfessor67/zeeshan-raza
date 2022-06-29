import axios from 'axios';

// admin login
export const login = (Username,Password) => async (dispatch) => {
	try {
		dispatch({
			type : "loginRequest"
		});

		const { data } = await axios.post("/api/v1/adminLogin/",{Username,Password});

		dispatch({
			type : "loginSucess",
			payload : data
		});

	}catch(err){
		dispatch({
			type : "loginFail",
			payload : err.response.data.message
		});
	}
}

// admin load
export const loadAdmin = () => async (dispatch) => {
	try {
		dispatch({
			type : "loadAdminRequest"
		});

		const { data } = await axios.get("/api/v1/loadAdmin/");

		dispatch({
			type : "loadAdminSucess",
			payload : data
		});

	}catch(err){
		dispatch({
			type : "loadAdminFail",
			payload : err.response.data.message
		});
	}
}


// update load
export const updateAdmin = (_id,Avatar,Name,Username) => async (dispatch) => {
	try {
		dispatch({
			type : "updateAdminRequest"
		});

		const { data } = await axios.put(`/api/v1/adminUpdate/${_id}`,{Name,Username,Avatar});

		dispatch({
			type : "updateAdminSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "updateAdminFail",
			payload : err.response.data.message
		});
	}
}

// change pass
export const changePass = (newPassword,oldPassword) => async (dispatch) => {
	try {
		dispatch({
			type : "changePassRequest"
		});

		const { data } = await axios.put(`/api/v1/changePassword/`,{newPassword,oldPassword});

		dispatch({
			type : "changePassSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "changePassFail",
			payload : err.response.data.message
		});
	}
}

// change pass
export const logoutAdmin = () => async (dispatch) => {
	try {
		dispatch({
			type : "logoutAdminRequest"
		});

		const { data } = await axios.get(`/api/v1/adminLogout/`);

		dispatch({
			type : "logoutAdminSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "logoutAdminFail",
			payload : err.response.data.message
		});
	}
}
