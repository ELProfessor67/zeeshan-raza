import Avatar from '@mui/material/Avatar';
import {NavLink} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'; 
import {logoutAdmin} from '../../Actions/admin';
import { confirmAlert } from 'react-confirm-alert';

export default function SideBar(){

	const toggler = () => {
		if(document.body.classList.contains('dash_active')){
			document.body.classList.remove('dash_active');
		}else{
			document.body.classList.add('dash_active');
		}
	}

	const {admin} = useSelector(state => state.admin);
	// console.log(admin.admin.Name)

	// logout handler

	const dispatch = useDispatch();
	const logoutHandler = () => {
		const logout = window.confirm("Are you sure to logout");
		if(logout){
			dispatch(logoutAdmin());
		}
	}
	return(
			<>
				<section className="humbagger_section">
					<div className="res_nav_btn" onClick={() => toggler()}>
						<div className="menu1"></div>
	      				<div className="menu2"></div>
	      				<div className="menu3"></div>
					</div>
				
				<section className="section_side">
					<nav className="dash_nav">
						<div className='profile'>
							<Avatar className="Avatar" src={admin.admin.Avatar.url ? admin.admin.Avatar.url : ''}/>
							<h2 className="admin_name">{admin ? admin.admin.Name : 'No Name '}</h2>
						</div>
						<ul>
							<li>
								<NavLink to="/admin/dashboard" className="nav_item">Doashboard</NavLink>
							</li>
							<li>
								<NavLink to="/admin/skills" className="nav_item">Skills</NavLink>
							</li>
							<li>
								<NavLink to="/admin/project" className="nav_item">Project</NavLink>
							</li>
							<li>
								<NavLink to="/admin/count" className="nav_item">Count</NavLink>
							</li>
							<li>
								<NavLink to="/admin/post" className="nav_item">People Post</NavLink>
							</li>
							<li>
								<NavLink to="/admin/message" className="nav_item">Client Message</NavLink>
							</li>
							<li>
								<NavLink to="/admin/setting" className="nav_item">Settings</NavLink>
							</li>
							<li>
								<NavLink to="/admin/changePassword" className="nav_item">Change Password</NavLink>
							</li>
							<li>
								<NavLink to="/" className="nav_item">Home Page</NavLink>
							</li>
							<li>
								<a className="nav_item" onClick={logoutHandler}>Logout</a>
							</li>
						</ul>
					</nav>
				</section>
				</section>
			</>
		);
}