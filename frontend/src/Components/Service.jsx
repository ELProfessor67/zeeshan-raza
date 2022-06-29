import Navbar from './Navbar/Nav';
import Services from './service/Service';
import Footer from './footer/Footer';
import ScrollBar from './footer/ScrollBar';
import {useEffect} from 'react';
import {Helmet} from "react-helmet";


export default function Service(){

	useEffect(() => {
		document.body.classList.remove('sticky');
	},[]);

	return(
			<>
				<Helmet>
                	<title>Zeeshan Raza Portfolio Service Page</title>
            	</Helmet>
				<Navbar/>
				<Services/>
				<Footer/>
				<ScrollBar ele=".section_service"/>

			</>
		);
}