import Sidebar from './Sidebar';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getSkill} from '../../Actions/skills';
import {getProject} from '../../Actions/project';
import {getPost} from '../../Actions/post';
import {getCount} from '../../Actions/count';
import {getMessage} from '../../Actions/message';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import {Helmet} from "react-helmet";


export default function Dashboard(){
	const {skills,project,post,count} = useSelector(state => state.skills);
	const {clientMessage} = useSelector(state => state.admin);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSkill());
		dispatch(getProject());
		dispatch(getPost());
		dispatch(getCount());
	},[]);

	ChartJS.register(
	  CategoryScale,
	  LinearScale,
	  BarElement,
	  Title,
	  Tooltip,
	  Legend,
	  ArcElement
	);


	const options = {
	  responsive: true,
	  plugins: {
	    legend: {
	      position: 'top',
	    },
	    title: {
	      display: true,
	      text: 'All section Graph',
	    },
	  },
	};

	const labels = ['Skills', 'Project', 'Post', 'Count', 'Message'];

	const data = {
	  labels,
	  datasets: [
	    {
	      label: 'All Section',
	      data: [skills ? skills.data.length : 0, project ? project.length : 0, post ? post.length : 0, count ? count.length : 0, clientMessage ? clientMessage.length : 0],
	      backgroundColor: [
	        'rgba(255, 99, 132, 0.2)',
	        'rgba(54, 162, 235, 0.2)',
	        'rgba(255, 206, 86, 0.2)',
	        'rgba(75, 192, 192, 0.2)',
	        'rgba(153, 102, 255, 0.2)',
	      ],
	      borderColor: [
	        'rgba(255, 99, 132, 1)',
	        'rgba(54, 162, 235, 1)',
	        'rgba(255, 206, 86, 1)',
	        'rgba(75, 192, 192, 1)',
	        'rgba(153, 102, 255, 1)',
	      ],
	      borderWidth: 1,
	    },
	  ],
	};

	return(
			<>
				<Helmet>
                <title>Zeeshan Raza Portfolio Admin Dashboard Page</title>
        </Helmet>
				<section className='section_main_dashboard'>
					<Sidebar/>
					{/*circle chart*/}
						<section className="section section_circleData">
							<div className="container">
								<h2 className="common_heading">Circle Graph</h2>
							</div>
							<div className="container">
								<div className="circles_data">
									<div className="circle" style={{background:"red"}}>
										<p className="name">Skills</p>
										<h2 className="count">{skills ? skills.data.length : 0}</h2>
									</div>
									<div className="circle" style={{background:"yellow"}}>
										<p className="name">Project</p>
										<h2 className="count">{project ? project.length : 0}</h2>
									</div>
									<div className="circle" style={{background:"green"}}>
										<p className="name">Post</p>
										<h2 className="count">{post ? post.length : 0}</h2>
									</div>
									<div className="circle" style={{background:"blue"}}>
										<p className="name">Count</p>
										<h2 className="count">{count ? count.length : 0}</h2>
									</div>
									<div className="circle" style={{background:"cyan"}}>
										<p className="name">Message</p>
										<h2 className="count">{clientMessage ? clientMessage.length : 0}</h2>
									</div>
								</div>
							</div>
						</section>
						{/*bar chart*/}
						<section className="section section_barChart">
							<div className="container">
								<h2 className="common_heading">Bar Graph</h2>
							</div>
							<div className="container">
								<div className="bar_chart">
									<Bar options={options} data={data} />;
								</div>
							</div>
						</section>
						{/*Doughnut chart*/}
						<section className="section section_DougChart">
							<div className="container">
								<h2 className="common_heading">Doughnut Graph</h2>
							</div>
							<div className="container">
								<div className="bar_doughnut">
									<Doughnut data={data} />
								</div>
							</div>
						</section>
				</section>
			</>
		);
}