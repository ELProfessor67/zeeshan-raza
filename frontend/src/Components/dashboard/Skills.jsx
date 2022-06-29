import Sidebar from './Sidebar';
import {getSkill, createSkill, updateSkill, deleteSkill} from '../../Actions/skills';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Fragment} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import {useState} from 'react';
// import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";

export default function(){

	const [createClose,setCreateClose] = useState(false);
	const [editClose, setEditClose] = useState(false);
	const [editId, setEditId] = useState();
	const [editName, setEditName] = useState();
	const [editPercentage, setEditPercentage] = useState();
	const [createName, setCreateName] = useState();
	const [createPercentage, setCreatePercentage] = useState();

	const dispatch = useDispatch();
	const {skills} = useSelector(state => state.skills);
	const {message,error,loading} = useSelector(state => state.admin);

	useEffect(() => {
		dispatch(getSkill());
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
		// console.log(skills.data);
		dispatch(getSkill());
	},[message,error]); 

	// edit skills details
	const editSkills = ({id,name,percentage}) => {
		setEditId(id);
		setEditName(name);
		setEditPercentage(percentage);
		setEditClose(true);
	}

	// submit create skills
	const createSkillsSubmit = (e) => {
		e.preventDefault();
		if(parseInt(createPercentage).toString() === NaN.toString()){
			toast.error("Percentage must be Number", {
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
	
		dispatch(createSkill(createName,parseInt(createPercentage)));
		setCreateClose(false);
		setCreateName('');
		setCreatePercentage('');
	}

	// submit update skills
	const updateSkillsSubmit = (e) => {
		e.preventDefault();
		const percentage = editPercentage.replace('%',"");
		if(parseInt(percentage).toString() === NaN.toString()){
			toast.error("Percentage must be Number", {
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

		dispatch(updateSkill(editId,editName,parseInt(percentage)));
		setEditId('');
		setEditName('');
		setEditPercentage('');
		setEditClose(false);
	}

	const deleteSkillsSubmit = (id) => {
		dispatch(deleteSkill(id));
	}

	const columns = [
	    { field: "id", headerName: "Skills ID", minWidth: 200, flex: 0.5 },

	    {
	      field: "name",
	      headerName: "Name",
	      minWidth: 150,
	      flex: 1,
	    },

	    {
	      field: "percentage",
	      headerName: "Percentage",
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
	          	<Button className="edit_btn" onClick={() => editSkills(params.row)}>
	            	<EditIcon />
	            </Button>
	            <Button className="delete_btn" onClick={() => deleteSkillsSubmit(params.row.id)}>
	            	<DeleteIcon />
	            </Button>
	          </Fragment>
	          );
	      },
	    },
	  ];

 const rows = [];

  skills && skills.data.length > 0 ?
    skills.data.forEach(({_id,Name,Percentage}) => {
      rows.push({
        id: _id,
        name: Name,
        percentage: `${Percentage}%`,
      });
    }) : console.log('');

	return(
			<>
				<Helmet>
                <title>Zeeshan Raza Portfolio Admin skills Page</title>
        </Helmet>
				<Sidebar/>
				<section className="section_dashboard section_skiils">
					<div className="container">
						<h2 className="common_heading">Customize Skills</h2>
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
					<div className="create_btn">
						<AddIcon onClick={() => setCreateClose(true)}/>
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
			        	<form onSubmit={createSkillsSubmit}>
			        		<div>
								<label htmlFor="name">Name : </label>
								<input type="text" placeholder="Skills Name" id="name" value={createName} onChange={(e) => setCreateName(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="percentage">Percentage : </label>
								<input type="text" placeholder="Skills Percentage" id="percentage" value={createPercentage} onChange={(e) => setCreatePercentage(e.target.value)} autoComplete='off' required/>
							</div>
							<div className="flex justify_content_center">
								<button className="btn btn_create">Create</button>
							</div>
					   	</form>
			        </div>
		      </Dialog>
		    {/*update dialog box*/}
		      <Dialog
			   		open={editClose}
			        onClose={() => setEditClose(false)}
			        className="diaglog_box_create"
			      >
			        <div className="create_form_box">
			        	<div className="title">
			        		<h2 className="common_heading">Update Skills</h2>
			        	</div>
			        	<form onSubmit={updateSkillsSubmit}>
			        		<div>
								<label htmlFor="name">Name : </label>
								<input type="text" placeholder="Skills Name" id="name" value={editName} onChange={(e) => setEditName(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="percentage">Percentage : </label>
								<input type="text" placeholder="Skills Percentage" id="percentage" value={editPercentage} onChange={(e) => setEditPercentage(e.target.value)} autoComplete='off' required/>
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
		