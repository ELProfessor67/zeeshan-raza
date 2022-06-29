import Sidebar from './Sidebar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {useState,useEffect} from 'react';
import {loadAdmin, updateAdmin} from '../../Actions/admin';
import {useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";


export default function(){
	const [avatar, setAvatar] = useState();
	const [name, setName] = useState();
	const [username, setUsername] = useState();

	const dispatch = useDispatch();
	const {admin,message,error} = useSelector(state => state.admin);

	useEffect(() => {
		dispatch(loadAdmin());
		setName(admin.admin.Name);
		setUsername(admin.admin.Username);
		setAvatar(admin.admin.Avatar.url);
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

		dispatch(loadAdmin());
	},[message,error]);
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

	// submit handler
	const formSubmithandler = (e) => {
		e.preventDefault();
		dispatch(updateAdmin(admin.admin._id,avatar,name,username));
		setName('');
		setUsername('');
	} 


	return(
		<>
			<Helmet>
                <title>Zeeshan Raza Portfolio Admin Settings Page</title>
        	</Helmet>
			<Sidebar/>
			<section className="section_dashboard section_setting">
				<div className="container">
					<h2 className="common_heading">Admin Settings</h2>
				</div>
				<div className="container container_form">
					<div className="form_admin_box login_container">
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
								<input type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off'/>
							</div>
							<div className="flex f_direction_col">
								<label htmlFor="username">Username :</label>
								<input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off'/>
							</div>
							<input type="file" placeholder="" id="avatar" onChange={avatarHamdler} hidden/>
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