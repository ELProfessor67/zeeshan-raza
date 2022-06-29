import bio from './bio.jpg';
import {Link} from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSkill } from '../../Actions/skills';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const Biodata = () => {

	const [moreSkill, setMoreSkill] = useState(false);
	const { skills } = useSelector((state) => state.skills);
	const dispatch = useDispatch();

	// if(skills){
	// 	console.log(skills.data.length)
	// }

	// get reffrence
	const refAbout = useRef(null);


	useEffect(() => {
		dispatch(getSkill());
	},[]);

	// useEffect(() => {
	// 	if(error){
	// 		alert(error);
	// 		dispatch({
	// 			type : 'clearErr'
	// 		});
	// 	}
	// },[error]);
	return(
		<>
			<section className="section_biodata section">
				<div className="container grid gird_two_column">
					{/*hero left side*/}
					<div className="bio_image">
						<img src={bio} alt="Our bio data image" loading='lazy'/>
					</div>
					{/*hero right side*/}
					<div className="bio_data">
						<h2 className="common_heading">My Bio-Data</h2>
						<p>Hello I am Zeeshan Raza. I am from Uttar Pradesh, Bareilly. I did my gradution in B.tech from Invertis University, Bareilly.</p>
					    <br/>
					    <p>Currently I am Complete some courses from Youtube and other Resources like Web Development, Programming and Graphic Designing.</p>
					    {/*modal */}
					    {skills && skills.data.length > 0 ? <ProgressBar skills={skills.data.slice(0,5)} /> : <h2>No skills Yet</h2>}

					    {/*dialog box*/}
					    <Dialog open={moreSkill} onClose={() => setMoreSkill(false)} className="diaglog_box_create">					    	
					    	<div className="create_form_box">
					    		<div className="container">
					    			<h2 className="common_heading">My Skills</h2>
					    		</div>
					    		{skills && skills.data.length > 0 ? <ProgressBar skills={skills.data} /> : <h2>NO skills yet</h2>}
					    	</div>					    		
					    </Dialog>
						<div className="bio_data_btn grid gird_two_column">
							{ skills && skills.data.length > 0 ? <button className="btn" onClick={() => setMoreSkill(true)}>See More</button> : <span></span>}
							<a href="/images/resume.pdf" className="btn" download>Download CV</a>
						</div>
					</div>
				</div>	
			</section>
		</>
		);
}

export default Biodata;