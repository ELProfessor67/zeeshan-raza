import Sidebar from './Sidebar';
import {getCount, createCount as CreateSubmit, deleteCount, updateCount} from '../../Actions/count';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, Fragment, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";



export default function(){

	// Dialog box handle
	const [createClose,setCreateClose] = useState(false);
	const [editClose, setEditClose] = useState(false);

	// create variable
	const [createName, setCreateName] = useState();
	const [createCount, setCreateCount] = useState();

	// edit varible
	const [editName, setEditName] = useState();
	const [editCount, setEditCount] = useState();
	const [editId, setEditId] = useState();

	// get count data
	const {count} = useSelector(state => state.skills);
	const {message,error} = useSelector(state => state.admin);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCount());
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
		dispatch(getCount());
	},[message,error]); 




	// create form submit
	const createCountSubmitHandler = (e) => {
		e.preventDefault();
		if(parseInt(createCount).toString() === NaN.toString()){
			toast.error("Count must be Number", {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,

			});
			return 
		}
		dispatch(CreateSubmit(createName,parseInt(createCount)));
		setCreateClose(false);
		setCreateName('');
		setCreateCount('');
	}


	// delete count request handler
	const deleteRequestSubmitHandler = (id) => {
		dispatch(deleteCount(id));
	}

	// edit button handler
	const editHandler = ({id,name,count}) => {
		setEditName(name);
		setEditCount(count);
		setEditId(id);
		setEditClose(true);
	}

	// edit submit handler
	const editFormSubmitHandler = (e) => {
		e.preventDefault();
		if(parseInt(editCount).toString() === NaN.toString()){
			toast.error("Count must be Number", {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,

			});
			return 
		}
		dispatch(updateCount(editId,editName,parseInt(editCount)));
		setEditClose(false);
	}


	// columns and row for table
	const columns = [
	    { field: "id", headerName: "Count ID", minWidth: 200, flex: 0.5 },

	    {
	      field: "name",
	      headerName: "Name",
	      minWidth: 150,
	      flex: 1,
	    },

	    {
	      field: "count",
	      headerName: "Count",
	      type: "number",
	      minWidth: 50,
	      flex: 0.5,
	    },

	    {
	      field: "actions",
	      flex: 0.3,
	      headerName: "Actions",
	      minWidth: 150,
	      // type: "number",
	      sortable: false,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<Button className="edit_btn" onClick={() => editHandler(params.row)}>
	            	<EditIcon />
	            </Button>
	            <Button className="delete_btn" onClick={() => deleteRequestSubmitHandler(params.row.id)}>
	            	<DeleteIcon />
	            </Button>
	          </Fragment>
	          );
	      },
	    },
	  ];

 const rows = [];

  count && count.length > 0 ?
    count.forEach(({_id,name,count}) => {
      rows.push({
        id: _id,
        name: name,
        count: count,
      });
    }) : console.log('');
	return(
			<>
				<Helmet>
                <title>Zeeshan Raza Portfolio Admin Count Page</title>
        </Helmet>
				<Sidebar/>
				<Sidebar/>
				<section className="section_dashboard section_skiils">
					<div className="container">
						<h2 className="common_heading">Customize Count</h2>
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
			        		<h2 className="common_heading">Create Skills</h2>
			        	</div>
			        	<form onSubmit={createCountSubmitHandler}>
			        		<div>
								<label htmlFor="name">Name : </label>
								<input type="text" placeholder="Count Name" id="name" value={createName} onChange={(e) => setCreateName(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="count">Count : </label>
								<input type="text" placeholder="Count" id="count" value={createCount} onChange={(e) => setCreateCount(e.target.value)} autoComplete='off' required/>
							</div>
							<div className="flex justify_content_center">
								<button className="btn btn_create">Create</button>
							</div>
					   	</form>
			        </div>
		      </Dialog>
		      {/*update product Dialog*/}
				<Dialog
			        open={editClose}
			        onClose={() => setEditClose(false)}
			        className="diaglog_box_create"
			      >
			        <div className="create_form_box">
			        	<div className="title">
			        		<h2 className="common_heading">Create Skills</h2>
			        	</div>
			        	<form onSubmit={editFormSubmitHandler}>
			        		<div>
								<label htmlFor="name">Name : </label>
								<input type="text" placeholder="Count Name" id="name" value={editName} onChange={(e) => setEditName(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="count">Count : </label>
								<input type="text" placeholder="Count" id="count" value={editCount} onChange={(e) => setEditCount(e.target.value)} autoComplete='off' required/>
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