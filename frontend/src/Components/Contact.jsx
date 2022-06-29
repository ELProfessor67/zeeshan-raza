import Navbar from './Navbar/Nav';
import Contacts from './Contact/Contact';
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
                	<title>Zeeshan Raza Portfolio Contact Page</title>
            	</Helmet>
				<Navbar/>
				<Contacts showMap={true}/>
				<Footer/>
				<ScrollBar ele=".section_contact"/>

			</>
		);
}