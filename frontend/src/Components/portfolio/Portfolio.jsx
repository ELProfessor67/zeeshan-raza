// import Project from './Project';
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getProject } from '../../Actions/project';

const Portfolio = ({ showAllBtn }) => {
	const { project:Pro } = useSelector((state) => state.skills);
	const [project,setProject] = useState();
	const [active_one,setActive_one] = useState(["btn","p_btn"]);
	const [active_two,setActive_two] = useState(["btn","p_btn"]);
	const [active_three,setActive_three] = useState(["btn","p_btn"]);
	const [active_four,setActive_four] = useState(["btn","p_btn"]);

	const filter_project = (btn) => {
		// const filter_data = Project.filter(({category:cur_cat}) => {
		// 	return cur_cat === category;
		// });
		// setProject(filter_data);

		// set btn hover
		if(btn === 1){

			const filter_data = Pro.filter(({Category:cur_cat}) => {
				return cur_cat === "website";
			});
			setProject(filter_data);
			// console.log(project);
			setActive_one(["btn","p_btn","active"]);
			setActive_two(["btn","p_btn"]);
			setActive_three(["btn","p_btn"]);
			setActive_four(["btn","p_btn"]);

		}else if(btn === 2){

			const filter_data = Pro.filter(({Category:cur_cat}) => {
				return cur_cat === "python";
			});
			setProject(filter_data);


			setActive_one(["btn","p_btn"]);
			setActive_two(["btn","p_btn","active"]);
			setActive_three(["btn","p_btn"]);
			setActive_four(["btn","p_btn"]);

		}else if (btn === 3){

			const filter_data = Pro.filter(({Category:cur_cat}) => {
				return cur_cat === "design";
			});
			setProject(filter_data);

			setActive_one(["btn","p_btn"]);
			setActive_two(["btn","p_btn"]);
			setActive_three(["btn","p_btn","active"]);
			setActive_four(["btn","p_btn"]);
		}
	}

	const showAllPro = () => {
		setProject(Pro);

		setActive_one(["btn","p_btn"]);
		setActive_two(["btn","p_btn"]);
		setActive_three(["btn","p_btn"]);
		setActive_four(["btn","p_btn","active"]);
	}

	useEffect(() => {
		if(Pro){
			setProject(Pro);
			filter_project(1);
		}
	},[Pro]);


	// load project
	const dispatch = useDispatch();
	
	// console.log(p[1])
	useEffect(() => {
		dispatch(getProject());
	},[]);


	// alert error
	// useEffect(() => {
	// 	if(error)
	// 	{
	// 		alert(error);
	// 		dispatch({
	// 			type : 'clearErr'
	// 		});
	// 	}
	// },[error]);
	return(
			<>
				<section className="section section_portfolio" id="Portfolio_section">
					<div className="container">
						<h2 className="common_heading">Latest work</h2>
						<p>Currently I build some diffrent category projects like Python Programming, Static Websites, Dynamic Websites, Mern Websites and Design.</p>
					</div>
					<div className="p_btns">
						<div className={active_one.join(" ")} onClick={()=>filter_project(1)}>Websites</div>
						<div className={active_two.join(" ")} onClick={()=>filter_project(2)}>Python</div>
						<div className={active_three.join(" ")} onClick={()=>filter_project(3)}>Design</div>
						{ showAllBtn ? <div className={active_four.join(" ")} onClick={()=>showAllPro()}>All</div> : <></>}
					</div>
					<div className="container grid gird_three_column Portfolio_images">
						{ project ? project.map(({Image,Link,Number:project_num}) => {
							return(
									<div className="img_overlay" key={project_num}>
										<img src={Image.url} alt="my work" loading='lazy'/>
										<div className="overlay">
											<a href={Link} target="_zeeshan" className="common_heading">Project {project_num}</a>
										</div>
									</div>
								);
						}) : <h2>No project yet</h2> } 
					</div>
				</section>
			</>
		);
}

export default Portfolio;