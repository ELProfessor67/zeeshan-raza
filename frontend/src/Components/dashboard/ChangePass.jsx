import Sidebar from './Sidebar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {useState,useEffect} from 'react';
import {changePass} from '../../Actions/admin';
import {useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";


export default function(){
	const [oldPass, setOldPass] = useState();
	const [newPass, setNewPass] = useState();
	const [conPass, setConPass] = useState();

	const dispatch = useDispatch();
	const {message,error} = useSelector(state => state.admin);

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
	},[message,error]);

	// form handler
	const formSubmithandler = (e) => {
		e.preventDefault();
		if(!(newPass === conPass)){
			return toast.warn('Password Not Match', {
						position: "bottom-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,

					});
		}
		dispatch(changePass(newPass,oldPass));
		setOldPass('');
		setConPass('');
		setNewPass('');
	}

	return(
		<>
			<Helmet>
                <title>Zeeshan Raza Portfolio Admin Change Password Page</title>
            </Helmet>
			<Sidebar/>
			<section className="section_dashboard section_setting section_chnagePass">
				<div className="container">
					<h2 className="common_heading">Change Password</h2>
				</div>
				<div className="container container_form">
					<div className="form_admin_box login_container">
						<form onSubmit={formSubmithandler}>
							<div className="flex f_direction_col">
								<label htmlFor="oldPass">Old Password :</label>
								<input type="text" placeholder="Old Password" id="oldPass" value={oldPass} onChange={e => setOldPass(e.target.value)} autoComplete='off' required/>
							</div>
							<div className="flex f_direction_col">
								<label htmlFor="newPass">New Password :</label>
								<input type="text" placeholder="New Password" id="newPass" value={newPass} onChange={e => setNewPass(e.target.value)} autoComplete='off' required/>
							</div>
							<div className="flex f_direction_col">
								<label htmlFor="conPass">Confirm New Password :</label>
								<input type="text" placeholder="Confirm New Password" id="conPass" value={conPass} onChange={e => setConPass(e.target.value)} autoComplete='off' required/>
							</div>
							<div className="flex justify_content_center">
								<button type="submit" className="btn">Update</button>
							</div>
						</form>
					</div>
				</div>
			</section>
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