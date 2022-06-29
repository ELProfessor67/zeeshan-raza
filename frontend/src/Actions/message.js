import axios from 'axios';

// create message
export const submitForm = (Name,Email,Subject,Message) => async (dispatch) => {
	try {

		dispatch({
			type : "creMessReq"
		});

		const { data } = await axios.post("/api/v1/message/",{Name,Email,Subject,Message});

		dispatch({
			type : "creMesSuc",
			payload : data
		});


		// send message to gamil
		await axios.post('https://formspree.io/f/mnqwwkea',{Name,Email,Subject,Message});

	}catch(err){
		dispatch({
			type : "creMesFai",
			payload : err.response.data.message
		});
	}
}

// get message
export const getMessage = () => async (dispatch) => {
	try {

		dispatch({
			type : "getMessageRequest"
		});

		const { data } = await axios.get("/api/v1/message/");

		dispatch({
			type : "getMessageSucess",
			payload : data
		});

	}catch(err){
		dispatch({
			type : "getMessageFail",
			payload : err.response.data.message
		});
	}
}

// delete message
export const deleteMessage = (_id) => async (dispatch) => {
	try {

		dispatch({
			type : "deleteMessageRequest"
		});

		const { data } = await axios.delete(`/api/v1/message/${_id}`);

		dispatch({
			type : "deleteMessageSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "deleteMessageFail",
			payload : err.response.data.message
		});
	}
}