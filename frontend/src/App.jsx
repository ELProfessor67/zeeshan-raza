import Main from './Components/Main';
import About from './Components/About';
import Service from './Components/Service';
import Portfo from './Components/Portfolio';
import Contact from './Components/Contact';
import {Routes , Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Nav';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Components/dashboard/Login';
import Dashboard from './Components/dashboard/Dashboard';
import Sidebar from './Components/dashboard/Sidebar';
import Skills from './Components/dashboard/Skills';
import {loadAdmin} from './Actions/admin';
import {useEffect} from 'react';
import Project from './Components/dashboard/Project';
import Count from './Components/dashboard/Count';
import Message from './Components/dashboard/Message';
import Setting from './Components/dashboard/Setting';
import ChangePass from './Components/dashboard/ChangePass';
import ClientPost from './Components/dashboard/ClientPost';
import Error from './Components/error';

// css file
import './style.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const {isAdmin} = useSelector(state => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAdmin());
  },[]);


  return (
    <Routes>
      {/*client routes*/}
      <Route path="/" element={<Main/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/service" element={<Service/>}/>
      <Route path="/portfolio" element={<Portfo/>}/>
      <Route path="/contact" element={<Contact/>}/>


      {/*admin routes*/}
      <Route path="/admin/dashboard" element={isAdmin ? <Dashboard/> : <Login/>}/>
      <Route element={<ProtectedRoute isAdmin={isAdmin}/>} >
          <Route path="/admin/skills" element={<Skills/>}/>
          <Route path="/admin/project" element={<Project/>}/>
          <Route path="/admin/count" element={<Count/>}/>
          <Route path="/admin/post" element={<ClientPost/>}/>
          <Route path="/admin/message" element={<Message/>}/>
          <Route path="/admin/setting" element={<Setting/>}/>
          <Route path="/admin/changePassword" element={<ChangePass/>}/>
      </Route>
      <Route path="/*" element={<Error/>}/>
    </Routes>
  );
}

export default App;
