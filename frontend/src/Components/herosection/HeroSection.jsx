import {Link} from 'react-router-dom';
import hero from './hero.jpg';
import { scroll } from '../../Actions/skills';


const HeroSection = () => {
	return(
		<>
			<main>
				<section className="section_hero section">
					<div className="container grid gird_two_column">
					{/*hero left side*/}
						<div className="section_hero_data">
							<p className="hero_top_data">This is me</p>
							<h1 className="hero_heading">Zeeshan Raza</h1>
							<p className="hero_para">
								I am Zeeshan Raza. A Full stack Web Developer, Python Programmer and freelancer.
							</p>
							<div>
								<Link to="#" className="btn hireme_btn" onClick={(e) => scroll('.section_contact')}>Hire me</Link>
							</div>
						</div>
						{/*hero right side*/}
						<div className="section_hero_image">
							<figure className="hero_img">
								<img src={hero} alt="hero section image" loading='lazy'/>
							</figure>
						</div>
					</div>	
				</section>
			</main>
		</>
		);
}

export default HeroSection;