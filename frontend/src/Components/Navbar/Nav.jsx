import { useState,useEffect, useMemo } from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import logo from './logo.png'
// import { Intersection } from '../../hooks/hooks';
import { useSelector } from 'react-redux';

const Nav = ({main}) => {
	
	// toogle nav
	const [headerClass, setHeaderClass] = useState(['header']);
	// const [isVisible, setIsVisible] = useState(null);
	const toggler = () => {
		headerClass.includes('nav_active') ? setHeaderClass(['header']) : setHeaderClass(['header','nav_active'])
	}

	// sticky nav bar code
	// targetRef ? console.log(targetRef.current) : console.log("ni aaya")
	const callback = entries => {
			const [entry] = entries; // const entry = entries[0]
			// console.log(entry.isIntersecting);
			!entry.isIntersecting ? document.body.classList.add('sticky') : document.body.classList.remove('sticky');
		}

	const option = useMemo(() => {
			return{
			root : null,
			threshold : 0
			}
		},[]);

	const {isAdmin} = useSelector(state => state.admin);


	useEffect(() => {
		if(main)
		{
			const observer = new IntersectionObserver(callback,option);

			const targetRef = document.querySelector('.section_hero');

			targetRef ? observer.observe(targetRef) : console.log("ni aaya");
			return () => {
				if(targetRef) observer.unobserve(targetRef);
			}
		}
	},[main]);

	return(
		<>
			<header className={headerClass.join(" ")}>
				<img src={logo} alt="our main Logo" className="logo"/>
				<nav className='navbar'>
					<ul className='navbar_lists'>
						<li><NavLink to="/" className="navbar_link home_link">Home</NavLink></li>
						<li><NavLink to="/about" className="navbar_link about_link">About</NavLink></li>
						<li><NavLink to='/service' className="navbar_link service_link">Service</NavLink></li>
						<li><NavLink to='/portfolio' className="navbar_link portfolio_link">Portfolio</NavLink></li>
						<li><NavLink to='/contact' className="navbar_link contact_link">Contact</NavLink></li>
						{isAdmin ? <li><NavLink to='/admin/dashboard/' className="navbar_link contact_link">Dashboard</NavLink></li> : ''}
					</ul>
				</nav>
				<div className="res_nav_btn" onClick={() => toggler()}>
					<div className="menu1"></div>
      				<div className="menu2"></div>
      				<div className="menu3"></div>
				</div>	
			</header>
			<Outlet/>
		</>
		);
}

export default Nav;

