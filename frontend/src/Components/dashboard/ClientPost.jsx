import Sidebar from './Sidebar';
import {getPost, createPost, deletePost, updatePost} from '../../Actions/post';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect, Fragment} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";



export default function(){
	const [commentClose, setCommentClose] = useState(false);
	const [comment, setComment] = useState(false);
	const [createClose, setCreateClose] = useState(false);

	// create post
	const [avatar, setAvatar] = useState();
	const [createWork, setCreateWork] = useState();
	const [createName, setCreateName] = useState();
	const [createComment, setCreateComment] = useState();

	// update post
	const [updateClose,setUpdateClose] = useState();
	const [updateAvatar, setUpdateAvatar] = useState();
	const [updateName, setUpdateName] = useState();
	const [updateWork, setUpdateWork] = useState();
	const [updateComment, setUpdateComment] = useState();
	const [updateId, setUpdateId] = useState();

	// load posts
	const dispatch = useDispatch();
	const {post} = useSelector(state => state.skills);
	const {message,error} = useSelector(state => state.admin);
	// console.log(post)
	useEffect(() => {
		dispatch(getPost());
	},[]);


	// show message
	useEffect(() => {
		if(message){
			toast.success(message, {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,

			});
			dispatch({type:"clearMessage"});
		}

		if(error){
			toast.error(error, {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,

			});
			dispatch({type:"clearError"});
		}
		dispatch(getPost());
	},[message,error]);

	// show comment handler
	const showCommentHandler = (comment) => {
		setCommentClose(true);
		setComment(comment);
	}

	// handle avatar
	const avatarHamdler = (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();

		reader.onload = () => {
			if(reader.readyState === 2){
				setAvatar(reader.result);
			}
		}
		reader.readAsDataURL(file);
	}

	// form submit handler
	const formSubmithandler = e => {
		e.preventDefault();
		dispatch(createPost(createName,createComment,createWork,avatar));
		setCreateClose(false);
		setCreateName('');
		setCreateWork('');
		setAvatar('');
		setCreateComment('');
	}

	// delete post handler
	const deletePostHandler = (id) => {
		dispatch(deletePost(id));
	}

	// handle update dialog
	const updateFormHandler = ({id,work,comment,avatar,action}) => {
		setUpdateAvatar(avatar);
		setUpdateWork(work);
		setUpdateName(id);
		setUpdateComment(comment);
		setUpdateId(action);
		setUpdateClose(true);
	}

	const updateAvatarHamdler = e => {
		const file = e.target.files[0];

		const reader = new FileReader();

		reader.onload = () => {
			if(reader.readyState === 2){
				setUpdateAvatar(reader.result);
			}
		}
		reader.readAsDataURL(file);
	}

	const updateFormSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(updatePost(updateId,updateName,updateWork,updateComment,updateAvatar));
		setUpdateClose(false);
	}

	// data grid
	const columns = [
			{
	      field: "id",
	      headerName: "Name",
	      type: "string",
	      minWidth: 100,
	      flex: 0.5,
	    },


	    { field: "avatar",
	      headerName: "Avatar",
	      minWidth: 50,
	      flex: 0.5,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<Avatar src={params.row.avatar}/>
	          </Fragment>
	          );
	      },
	    },

	    {
	      field: "work",
	      headerName: "Work",
	      // type: "number",
	      minWidth: 100,
	      flex: 0.5,
	    },

	    {
	      field: "comment",
	      headerName: "Comment",
	      minWidth: 50,
	      flex: 1,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<Button onClick={() => showCommentHandler(params.row.comment)}>Read</Button>
	          </Fragment>
	          );
	      },
	    },
	    {
	      field: "actions",
	      flex: 0.3,
	      headerName: "Actions",
	      minWidth: 100,
	      type: "number",
	      sortable: false,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<Button className="edit_btn" onClick={() => updateFormHandler(params.row)}>
	            	<EditIcon />
	            </Button>
	            <Button className="delete_btn" onClick={() => deletePostHandler(params.row.action)}>
	            	<DeleteIcon />
	            </Button>
	          </Fragment>
	          );
	      },
	    },
	  ];
 const rows = [];

  post && post.length > 0 ?
    post.forEach(({Work,name,comment,avatar,_id}) => {
      rows.push({
        avatar: avatar.url,
        id: name,
        comment: comment,
        work: Work,
        action : _id
      });
    }) : console.log('');
	return(
			<>
				<Helmet>
                <title>Zeeshan Raza Portfolio Admin Client Post Page</title>
            </Helmet>
				<Sidebar/>
				<section className="section_dashboard section_skiils section_project section_client_post">
					<div className="container">
						<h2 className="common_heading">Customize People Post</h2>
					</div>
					<div className="container">
						<div className="skills_list_container">
							<DataGrid
							  	rows={rows}
					            columns={columns}
					            pageSize={10}
					            disableSelectionOnClick
					            className="productListTable"
					            autoHeight					           
						  />

						</div>
					</div>
					<div className="create_btn" onClick={() => setCreateClose(true)}>
						<AddIcon/>
					</div>
				</section>
				{/*read comment*/}
		      <Dialog
			        open={commentClose}
			        onClose={() => setCommentClose(false)}
			        className="diaglog_box_create"
			      >
			        <div className="create_form_box">
			        	<div className="message_client">
			        		<p className='showComment'>{comment ? comment : ''}</p>
			        	</div>
			        </div>
		      </Dialog>
		      {/*create post*/}
		      <Dialog
			        open={createClose}
			        onClose={() => setCreateClose(false)}
			        className="diaglog_box_create create_post"
			      >
			        <div className="create_form_box">	
									<div className="avatar_box">
											<Avatar className="avatar" src={avatar ? avatar : ''}/>
											<Button>
												<label htmlFor="avatar">
													Change Profile Photo
												</label>
											</Button>
									</div>
									<form onSubmit={formSubmithandler}>
										<div className="flex f_direction_col">
											<label htmlFor="name">Name :</label>
											<input type="text" placeholder="Name" id="name" value={createName} onChange={(e) => setCreateName(e.target.value)} autoComplete='off' required/>
										</div>
										<div className="flex f_direction_col">
											<label htmlFor="work">Work :</label>
											<input type="text" placeholder="Work" id="work" value={createWork} onChange={(e) => setCreateWork(e.target.value)} autoComplete='off' required/>
										</div>
										<div className="flex f_direction_col">
											<label htmlFor="comment">Comment :</label>
											<textarea placeholder="Comment" id="comment" value={createComment} onChange={(e) => setCreateComment(e.target.value)} autoComplete='off' required/>
										</div>
										<input type="file" placeholder="" id="avatar" onChange={avatarHamdler} hidden/>
										<div className="flex justify_content_center">
											<button type="submit" className="btn">Create</button>
										</div>
									</form>
			        </div>
		      </Dialog>

		      {/*update post*/}
		      <Dialog
			        open={updateClose}
			        onClose={() => setUpdateClose(false)}
			        className="diaglog_box_create create_post"
			      >
			        <div className="create_form_box">	
									<div className="avatar_box">
											<Avatar className="avatar" src={updateAvatar ? updateAvatar : ''}/>
											<Button>
												<label htmlFor="avatar">
													Change Profile Photo
												</label>
											</Button>
									</div>
									<form onSubmit={updateFormSubmitHandler}>
										<div className="flex f_direction_col">
											<label htmlFor="name">Name :</label>
											<input type="text" placeholder="Name" id="name" value={updateName} onChange={(e) => setUpdateName(e.target.value)} autoComplete='off' required/>
										</div>
										<div className="flex f_direction_col">
											<label htmlFor="work">Work :</label>
											<input type="text" placeholder="Work" id="work" value={updateWork} onChange={(e) => setUpdateWork(e.target.value)} autoComplete='off' required/>
										</div>
										<div className="flex f_direction_col">
											<label htmlFor="comment">Comment :</label>
											<textarea placeholder="Comment" id="comment" value={updateComment} onChange={(e) => setUpdateComment(e.target.value)} autoComplete='off' required/>
										</div>
										<input type="file" placeholder="" id="avatar" onChange={updateAvatarHamdler} hidden/>
										<div className="flex justify_content_center">
											<button type="submit" className="btn">Update</button>
										</div>
									</form>
			        </div>
		      </Dialog>

		      {/*alert*/}
		      <ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					theme="dark"
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</>
		);
}