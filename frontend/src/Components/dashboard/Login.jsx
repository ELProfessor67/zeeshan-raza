import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailLockIcon from '@mui/icons-material/MailLock';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login as loginAdmin} from '../../Actions/admin';
import { ToastContainer, toast } from 'react-toastify';
import {Helmet} from "react-helmet";


export default function Login(){
	const [passHide, setPassHide] = useState(true);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();
	const {error,message} = useSelector(state => state.admin);

	const login = (e) => {
		e.preventDefault();
		dispatch(loginAdmin(username,password));
		setUsername('');
		setPassword('');
	}

	useEffect(()=>{
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
	},[error,message]);

	// load admin
	// useEffect(()=> {
	// 	dispatch(loadAdmin());
	// },[]);

	return(
			<>
				<Helmet>
                	<title>Zeeshan Raza Portfolio Admin Login Page</title>
        		</Helmet>
				<section className='section_login section'>
					<div className="login_container">
						<div className="logo_box">
							<AccountCircleIcon/>
						</div>
						<form className="form_box flex justify_items_center align_items_center f_direction_col" onSubmit={login}>
							<div className="flex align_items_center">
								<label htmlFor="username"><MailLockIcon/></label>
								<input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value) } autoComplete='off' required/>
							</div>
							<div className="flex align_items_center">
								<label htmlFor="password"><KeyIcon/></label>
								<input type={passHide ? "password" : "type"} placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' required/>
								{passHide ? <VisibilityOffIcon onClick={() => setPassHide(false)}/> : <RemoveRedEyeIcon onClick={() => setPassHide(true)}/>}
							</div>
							<div className="flex justify_content_center">
								<button className="btn btn_login">Login</button>
							</div>

						</form>
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