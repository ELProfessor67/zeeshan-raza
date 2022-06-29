import { Link } from 'react-router-dom';

export default function FreeLan(){
	return(
			<>
				<section className="section section_freelancing" style={{backgroundImage: 
 "url('/images/freelancingbg.jpg')"}}>
					<div className="overlay"></div>
					<div className="container">
						<h2>I am <span>available</span> for freelancing</h2>
						<p>Hello I am Zeeshan Raza. I am from Uttar Pradesh, Bareilly. I did my gradution in B.tech from Invertis University, Bareilly.</p>
						<Link to="/contact" className="btn">Hire Me</Link>
					</div>
				</section>
			</>
		);
}