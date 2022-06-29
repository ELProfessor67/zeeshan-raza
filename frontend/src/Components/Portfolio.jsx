import Navbar from './Navbar/Nav';
import Portfolio from './portfolio/Portfolio';
import Footer from './footer/Footer';
import ScrollBar from './footer/ScrollBar';
import {useEffect} from 'react';
import {Helmet} from "react-helmet";

export default function Portfo(){
	useEffect(() => {
		document.body.classList.remove('sticky');
	},[]);

	return(
			<>
				<Helmet>
                	<title>Zeeshan Raza Portfolio Portfolio Page</title>
            	</Helmet>
				<Navbar/>
				<Portfolio showAllBtn={true}/>
				<Footer/>
				<ScrollBar ele=".section_portfolio"/>
			</>
		);
}