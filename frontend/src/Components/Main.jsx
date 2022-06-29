import Nav from './Navbar/Nav';
import HeroSection from './herosection/HeroSection';
import BioData from './biodata/BioData';
import Portfolio from './portfolio/Portfolio';
import AniCounter from './animatedCounter/AniCounter';
import Service from './service/Service';
import Testimonial from './testimonial/Testimonial';
import FreeLan from './freelanSec/FreeLan';
import Contact from './Contact/Contact';
import Footer from './footer/Footer';
import ScrollBar from './footer/ScrollBar';
import {useEffect} from 'react';
import {Helmet} from "react-helmet";

const Main = () => {
	return(
		<>
			<Helmet>
                <title>Zeeshan Raza Portfolio Home Page</title>
            </Helmet>
			<Nav main={true}/>
			<HeroSection/>
			<BioData/>
			<Portfolio/>
			<AniCounter/>
			<Service/>
			<Testimonial/>
			<FreeLan/> 
			<Contact/>
			<Footer/>
			<ScrollBar ele=".section_hero"/>
		</>
		);
}

export default Main