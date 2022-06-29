import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, Fragment, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMessage,deleteMessage} from '../../Actions/message';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";


export default function(){

	// Dialog variable
	const [readClose, setReadClose] = useState();

	// read variable
	const [subject, setSubject] = useState();
	const [readMessage, setReadMessage] = useState();



	const dispatch = useDispatch();
	const {clientMessage,message,error} = useSelector(state => state.admin);
	console.log(clientMessage)

	useEffect(() => {
		dispatch(getMessage());
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
		dispatch(getMessage());
	},[message,error]);


	// Dialog handler
	const readMessageDialogHandler = ({Subject,Message}) => {
		setSubject(Subject);
		setReadMessage(Message);
		setReadClose(true);
	}

	// delete message
	const deleteMessageHandler = (id) => {
		dispatch(deleteMessage(id));
	}


	// columns and row for table
	const columns = [
		{
	      field: "id",
	      headerName: "Date",
	      type: "Date",
	      minWidth: 120,
	      flex: 0.5,
	    },

	    { field: "name", headerName: "Name", minWidth: 110, flex: 0.5 },

	    {
	      field: "email",
	      headerName: "Email",
	      minWidth: 120,
	      flex: 1,
	    },

	    {
	      field: "actions",
	      flex: 0.3,
	      headerName: "Message",
	      minWidth: 150,
	      // type: "number",
	      sortable: false,
	      renderCell: (params) => {
	        return (
	          <Fragment>
	          	<Button className="edit_btn" onClick={() => readMessageDialogHandler(params.row.action)}>
	            	read
	            </Button>
	            <Button className="delete_btn" onClick={() => deleteMessageHandler(params.row.action._id)}>
	            	<DeleteIcon />
	            </Button>
	          </Fragment>
	          );
	      },
	    },
	  ];

 const rows = [];

  clientMessage && clientMessage.length > 0 ?
    clientMessage.forEach(({_id,Date:date,Name,Email,Subject,Message}) => {
      rows.push({
        id: date,
        name: Name,
        email: Email,
        action: {_id,Subject,Message}
      });
    }) : console.log('');

	return(
			<>
				<Helmet>
                <title>Zeeshan Raza Portfolio Admin Client Message Page</title>
        </Helmet>
				<Sidebar/>
				<section className="section_dashboard section_skiils section_client_message">
					<div className="container">
						<h2 className="common_heading">Client Message</h2>
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
				</section>
				{/*cretre product Dialog*/}
				<Dialog
			        open={readClose}
			        onClose={() => setReadClose(false)}
			        className="diaglog_box_create"
			      >
			        <div className="create_form_box">
			        	<div className="subject_box">
			        		<h2 className="common_heading subject">{subject}</h2>
			        	</div>
			        	<div className="message_client">
			        		<p>{readMessage}</p>
			        	</div>
			        </div>
		      </Dialog>
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
