import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';

export default function Footer(){
	
	return(
		<>
			<footer className="footer_section section">
				<div className="container grid gird_four_column">
					<div className="f_about">
						<h3>About</h3>
						<p>
							Hello I am Zeeshan Raza. I am from Uttar Pradesh, Bareilly. I did my gradution in B.tech from Invertis University, Bareilly.
						</p>
					</div>
					{/*end*/}
					<div className="f_links">
						<h3>Links</h3>
						<ul>
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/">Home</Link>
							</li>
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/about">About</Link>
							</li> 
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/service">Services</Link>
							</li> 
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/portfolio">Portfolio</Link>
							</li> 
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/contact">Contact</Link>
							</li> 
						</ul>
					</div>
					{/*end*/}
					<div className="f_service">
						<h3>Services</h3>
						<ul>
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/contact">Web Design</Link>
							</li>
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/contact">Web Development</Link>
							</li> 
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/contact">Photogrophy</Link>
							</li> 
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/contact">Mobile Apps</Link>
							</li> 
							<li>
								<span><ArrowForwardIcon/></span>
								<Link to="/contact">Graphic Design</Link>
							</li> 
						</ul>
					</div>
					{/*end*/}
					<div className="f_adress">
						<h3>Have a Questions ?</h3>
						<address>
							<div>
								<p>
									<span><LocationOnIcon/></span>
								 	 <a href="https://goo.gl/maps/FiLxdbYmKt72HVZz7" target="_zeeshan">Uttar Pradesh, Bareilly</a>
								</p>
							</div>
							<div>
								<p>
									<span><PhoneInTalkIcon/></span>
								 	 <a href="tel:+917302332142">+91 7302332142</a>
								</p>
							</div>
							<div>
								<p>
									<span><EmailIcon/></span>
								 	 <a href="mailto:jeeshanr599@gmail.com">jeeshanr599@gmail.com</a>
								</p>
							</div>
							
						</address>
					</div>
				</div>
				<div className="container">
					<div className="f_social_icons">
						<a href="https://www.instagram.com/el___professor____/?hl=en" target="_zeeshan">
							<InstagramIcon/>
						</a>
						<a href="#">
							<FacebookIcon/>
						</a>
						<a href="https://github.com/ELProfessor67" target='_zeeshan'>
							<GitHubIcon/>
						</a>
					</div>
					<div className="f_credits">
						<p>Copyright © 2022 All rights reserved | This template is made with <span style={{color:"red"}}>❤</span> by Zeeshan Raza</p>
					</div>
				</div>
			</footer>
		</>
		);
}