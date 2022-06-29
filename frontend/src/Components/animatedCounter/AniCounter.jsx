import CountUp from 'react-countup';
import { useState, useEffect, useMemo, useRef } from 'react';
// import work from './work';
import {getCount} from '../../Actions/count';
import {useDispatch, useSelector} from 'react-redux';

export default function AniCounter(){
	const [view, setView] = useState(false);
	const targetRef = useRef(null);

	const callback = (entries,observer) => {
		const [entry] = entries;
		// console.log(entry.isIntersecting)
		if(entry.isIntersecting){
			setView(true);
			if(targetRef) observer.unobserve(targetRef.current);
		}else{
			return
		}
	}

	const option = useMemo(()=>{
		return{
			root : null,
			threshold : 0
		}
	},[targetRef]);

	useEffect(() => {
		const observer = new IntersectionObserver(callback,option);
		if(targetRef) observer.observe(targetRef.current);
		
	},[targetRef]);


	// get count from database
	const dispatch = useDispatch();
	const {count:work } = useSelector(state => state.skills);

	// if(count) console.log(count)

	useEffect(() => {
		dispatch(getCount());
	},[]);


	// alert error
	// useEffect(() => {
	// 	if(error)
	// 	{
	// 		alert(error);
	// 		dispatch({
	// 			type : "clearErr"
	// 		});
	// 	}
	// },[error]);

	return(
			<>
				<section className="section section_counter" ref={targetRef}>
					<div className="container grid gird_four_column">
						{work ?  work.map(({name,count},i) => {
							return(
									<div key={i}>
										<h2 className="counter_number"><CountUp start={0} end={view ? count : null} duration={5} key={count.length}/>+</h2>
										<p>{name}</p>
									</div>
								);
						}) : <h2>No count yet</h2>}
					</div>
				</section>
			</>
		);
}