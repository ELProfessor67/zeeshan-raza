import {useNavigate} from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Helmet} from "react-helmet";

export default function (){
	const navigate = useNavigate();
	return(
			<>
				<Helmet>
                	<title>Zeeshan Raza Portfolio Erorr Page</title>
            	</Helmet>
				<section className="section section_error">
					<div className="error_container">
						<h2 className="error_main_heading">Oops!</h2>
						<h3>404-Page not found</h3>
						<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
						<button className="btn" onClick={() => navigate(-1)}>Go Back</button>
						<div className="f_social_icons">
							<a href="https://www.instagram.com/el___professor____/?hl=en" target="_zeeshan">
								<InstagramIcon/>
							</a>
							<a href="#">
								<FacebookIcon/>
							</a>
							<a href="https://github.com/ELProfessor67" target="_zeeshan">
								<GitHubIcon/>
							</a>
						</div>
					</div>
				</section>
			</>
		);
}