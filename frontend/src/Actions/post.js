import axios from 'axios';

// get project
export const getPost = () => async (dispatch) => {
	try {
		dispatch({
			type : "getPostReq"
		});

		const { data } = await axios.get("/api/v1/post/");

		dispatch({
			type : "postGetSuc",
			payload : data
		});

	}catch(err){
		dispatch({
			type : "postGetFai",
			payload : err.response.data.message
		});
	}
}

// create post
export const createPost = (name,comment,Work,avatar) => async (dispatch) => {
	try {
		dispatch({
			type : "createPostRequest"
		});

		const { data } = await axios.post("/api/v1/post/",{name,comment,Work,avatar});

		dispatch({
			type : "createPostSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "createPostFail",
			payload : err.response.data.message
		});
	}
}

// delete post
export const deletePost = (_id) => async (dispatch) => {
	try {
		dispatch({
			type : "deletePostRequest"
		});

		const { data } = await axios.delete(`/api/v1/post/${_id}`);

		dispatch({
			type : "deletePostSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "deletePostFail",
			payload : err.response.data.message
		});
	}
}

// update post
export const updatePost = (_id,name,Work,comment,avatar) => async (dispatch) => {
	try {
		dispatch({
			type : "updatePostRequest"
		});

		const { data } = await axios.put(`/api/v1/post/${_id}`,{name,comment,Work,avatar});

		dispatch({
			type : "updatePostSucess",
			payload : data.message
		});

	}catch(err){
		dispatch({
			type : "updatePostFail",
			payload : err.response.data.message
		});
	}
}