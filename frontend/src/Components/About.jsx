import Navbar from './Navbar/Nav';
import BioData from './biodata/BioData';
import Footer from './footer/Footer';
import ScrollBar from './footer/ScrollBar';
import {useEffect} from 'react';
import {Helmet} from "react-helmet";

export default function About(){

	useEffect(() => {
		document.body.classList.remove('sticky');
	},[]);

	return(
			<>
				<Helmet>
                	<title>Zeeshan Raza Portfolio About Page</title>
            	</Helmet>
				<Navbar/>
				<BioData/>
				<Footer/>
				<ScrollBar ele=".section_biodata"/>

			</>
		);
}