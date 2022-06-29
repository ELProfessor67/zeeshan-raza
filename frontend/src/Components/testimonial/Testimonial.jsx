import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper';
import Card from "./card.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import "./swiper.css";
// import ClientData from './ClientData';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPost } from '../../Actions/post';

export default function Testimonial(){
	const [perview, setPerview] = useState(2);

	useEffect(() => {
		const mediawatcher = window.matchMedia("(max-width: 780px)");

		// set initial value
		mediawatcher.matches ? setPerview(1) : setPerview(2);

		// watch for update
		function updateValue(e) {
			e.matches ? setPerview(1) : setPerview(2);
		}

		mediawatcher.addEventListener('change',updateValue);

		return function cleanup(){
			mediawatcher.removeEventListener('change',updateValue);
		}

	},[]);



	// get posts
	const {post } = useSelector((state) => state.skills);
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getPost());
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
			<section className="section section_testimonial">
				<div className="container">
					<h2 className="common_heading">Happy Clients Work</h2>
				</div>
				{/*swiper*/}
      			<Swiper
        			slidesPerView={perview}
        			modules={[Pagination,Autoplay]}
        			autoplay={{ delay:2500, disableOnInteraction: false }}
        			spaceBetween={30}
        			pagination={{ clickable: true }}
        			className="mySwiper container" >
        				{post ? post.map((data) => {
        					return <SwiperSlide><Card {...data} key={data.name.length}/></SwiperSlide>
        				}) : <h1>No post yet</h1>}
      			</Swiper>
      		</section>
    </>
		);
}