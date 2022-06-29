import Sidebar from './Sidebar';
import {getProject, createProject, updateProject, deleteProject} from '../../Actions/project';
import {useEffect, Fragment, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";

export default function(){

	const [createClose,setCreateClose] = useState(false);
	const [updateClose, setUpdateClose] = useState(false);

	// create variable
	const [image, setImage] = useState();
	const [id, setId] = useState();
	const [category, setCategory] = useState();
	const [link, setLink] = useState();

	// update valriables
	const [updateImage, setUpdateImage] = useState();
	const [updateId, setUpdateId] = useState();
	const [updateCategory, setUpdateCategory] = useState();
	const [updateLink, setUpdateLink] = useState();
	const [updateMainId, setUpdateMainId] = useState();

	const {project} = useSelector(state => state.skills);
	const {message, error} = useSelector(state => state.admin);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProject());
	},[]);

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

		dispatch(getProject());
	},[message,error]);


	const submitImagehandler = (e) => {
		// console.log(e.target.files);
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			if(reader.readyState === 2){
				setImage(reader.result);
			}
		}
		reader.readAsDataURL(file);
	}


	const updateSubmitImagehandler = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			if(reader.readyState === 2){
				setUpdateImage(reader.result);
			}
		}
		reader.readAsDataURL(file);
	}

	const updateDialogHandler = ({id,link,category,image}) => {
		setUpdateId(id);
		setUpdateLink(link.link);
		setUpdateCategory(category);
		setUpdateImage(image.url);
		setUpdateMainId(link._id);
		setUpdateClose(true);
	}

	const createFormSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(createProject(id,link,image,category));
		setId('');
		setImage('');
		setCategory('');
		setLink('')
		setCreateClose(false);
	}

	const updateFormSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(updateProject(updateMainId,updateId,updateLink,updateImage,updateCategory));
		setUpdateClose(false);
	}

	const deleteProjectHandler = (_id) => {
		dispatch(deleteProject(_id));
	}


	const columns = [
			{
	      field: "id",
	      headerName: "Project NO.",
	      type: "number",
	      minWidth: 10,
	      flex: 0.5,
	    },


	    { field: "image",
	     	headerName: "Image",
	      minWidth: 150,
	      flex: 0.5,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<img src={params.row.image.url} alt="project image" className="TableImage"/>
	          </Fragment>
	          );
	      },
	    },

	    {
	      field: "link",
	      headerName: "Link",
	      minWidth: 200,
	      flex: 1,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<a href={params.row.link.link} className="TableLink" target="_zeeshan">{params.row.link.link}</a>
	          </Fragment>
	          );
	      },
	    },

	    {
	      field: "category",
	      headerName: "Category",
	      // type: "number",
	      minWidth: 50,
	      flex: 0.5,
	    },
	    {
	      field: "actions",
	      flex: 0.3,
	      headerName: "Actions",
	      minWidth: 150,
	      type: "number",
	      sortable: false,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<Button className="edit_btn" onClick={() => updateDialogHandler(params.row) }>
	            	<EditIcon />
	            </Button>
	            <Button className="delete_btn" onClick={() => deleteProjectHandler(params.row.link._id)}>
	            	<DeleteIcon />
	            </Button>
	          </Fragment>
	          );
	      },
	    },
	  ];

 const rows = [];

  project && project.length > 0 ?
    project.forEach(({Image,Link:link,Number:num,Category,_id}) => {
      rows.push({
        image: Image,
        link: {link,_id},
        category: Category,
        id : num
      });
    }) : console.log('');

	return(
			<>
				<Helmet>
                <title>Zeeshan Raza Portfolio Admin Project Page</title>
        </Helmet>
				<Sidebar/>
				<section className="section_dashboard section_skiils section_project">
					<div className="container">
						<h2 className="common_heading">Customize Project</h2>
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
				{/*cretre product Dialog*/}
				<Dialog
			        open={createClose}
			        onClose={() => setCreateClose(false)}
			        className="diaglog_box_create"
			      >
			        <div className="create_form_box">
			        	<div className="title">
			        		<h2 className="common_heading">Create Project</h2>
			        	</div>
			        	<form onSubmit={createFormSubmitHandler}>
			        		<div>
								<label htmlFor="project_num">Project NO. : </label>
								<input type="text" placeholder="Project Number" id="project_num" value={id} onChange={(e) => setId(e.target.value)}  autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="link">Link : </label>
								<input type="text" placeholder="Project Link" id="link" value={link} onChange={(e) => setLink(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="category">Category : </label>
								<select id="category" className="seclect_create_project" value={category} onChange={(e) => setCategory(e.target.value)}>
									<option value="">Choose Category</option>
									<option value="website">Website</option>
									<option value="python">Python</option>
									<option value="design">Design</option>
								</select>
							</div>
							<div>
								<label htmlFor="image">Project Image : </label>
								<input type="file" id="image" className="selectImage" onChange={submitImagehandler}/>
							</div>
							<div className="image_container">
								{image ? <img src={image} alt="project image" /> : ""}
							</div>
							<div className="flex justify_content_center">
								<button className="btn btn_create">Create</button>
							</div>
					   	</form>
			        </div>
		      </Dialog>

		      {/*update dialog box*/}
		      <Dialog
			        open={updateClose}
			        onClose={() => setUpdateClose(false)}
			        className="diaglog_box_create"
			      >
			        <div className="create_form_box">
			        	<div className="title">
			        		<h2 className="common_heading">Update Project</h2>
			        	</div>
			        	<form onSubmit={updateFormSubmitHandler}>
			        		<div>
								<label htmlFor="project_num">Project NO. : </label>
								<input type="text" placeholder="Project Number" id="project_num" value={updateId} onChange={(e) => setUpdateId(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="link">Link : </label>
								<input type="text" placeholder="Project Link" id="link" value={updateLink} onChange={(e) => setUpdateLink(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="category">Category : </label>
								<select id="category" className="seclect_create_project" value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)}>
									<option value="">Choose Category</option>
									<option value="website">Website</option>
									<option value="python">Python</option>
									<option value="design">Design</option>
								</select>
							</div>
							<div>
								<label htmlFor="image">Project Image : </label>
								<input type="file" id="image" className="selectImage" onChange={updateSubmitImagehandler}/>
							</div>
							<div className="image_container">
								{updateImage ? <img src={updateImage} alt="project image" /> : ""}
							</div>
							<div className="flex justify_content_center">
								<button className="btn btn_create">Update</button>
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