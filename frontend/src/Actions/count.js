import axios from 'axios';

// get Count
export const getCount = () => async (dispatch) => {
	try {
		dispatch({
			type : "creCountReq"
		});

		const { data } = await axios.get("/api/v1/count");

		dispatch({
			type : "creCountSuc",
			payload : data.data
		});

	}catch(err){
		dispatch({
			type : "creCountFai",
			payload : err.response.data.message
		});
	}
}

// create Count
export const createCount = (name,count) => async (dispatch) => {
	try {
		dispatch({
			type : "createCountRequest"
		});

		const { data } = await axios.post("/api/v1/count",{name,count});


		dispatch({
			type : "createCountSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "createCountFail",
			payload : err.response.data.message
		});
	}
}

// delete Count
export const deleteCount = (_id) => async (dispatch) => {
	try {
		dispatch({
			type : "deleteCountRequest"
		});

		const { data } = await axios.delete(`/api/v1/count/${_id}`);


		dispatch({
			type : "deleteCountSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "deleteCountFail",
			payload : err.response.data.message
		});
	}
}

// update Count
export const updateCount = (_id,name,count) => async (dispatch) => {
	try {
		dispatch({
			type : "updateCountRequest"
		});

		const { data } = await axios.put(`/api/v1/count/${_id}`,{name,count});


		dispatch({
			type : "updateCountSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "updateCountFail",
			payload : err.response.data.message
		});
	}
}