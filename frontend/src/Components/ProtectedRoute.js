import {Navigate, Outlet} from 'react-router-dom';

export default function ProtectedRoute({isAdmin}) {
	if(!isAdmin){
		return <Navigate to="/"/>;
	}
	return <Outlet/>
}