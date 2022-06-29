import Data from './Data';
import {useRef, useMemo, useEffect, useState} from 'react';


// const Animate = ({percentage}) => {
// 	const [curPer, setCurper] = useState(0);
// 	if(percentage){
// 		const move = () => {
// 			if(percentage >= curPer){
// 				console.log(percentage,curPer);
// 				setCurper(curPer+1);
// 				console.log(curPer);
// 			}else{
// 				setCurper(percentage);
// 				clearInterval(inter);
// 			}
// 		}
// 		// const inter = setInterval(move,1000);
// 		// setTimeout(move,3000);
// 		// setTimeout(move,200);
// 		// setTimeout(move,300);
// 		// setTimeout(move,400);
// 		// setTimeout(move,500);
// 		// setTimeout(move,600);
// 	}
// 	return(
// 			<>
// 				<div className="bio_progress_level" style={{width:`${curPer}%`}}>
// 					<span style={{left:`${curPer-4}%`}}>{`${curPer}%`}</span>
// 				</div>
// 			</>
// 		);
// }

const ProgressBar = ({skills}) => {

	const targetRef = useRef(null);
	// const zero = skills.map((data) => {
	// 	return {...data,Percentage:0}
	// });
	const [curSkill,setCurskills] = useState(skills);
	// const [skillCopy,setSkillCopy] = useState([...skills]);
	// console.log(curSkill)

	// const callback = (entries,observer) => {
	// 	const [entry] = entries;
	// 	if(entry.isIntersecting){
	// 		skills.forEach((data,i) => {
	// 			if(data.Percentage > curSkill[i].Percentage){
	// 				curSkill[i].Percentage += 1;
	// 				setCurskills(curSkill);
	// 				console.log(curSkill[i].Percentage)
	// 			}else{
	// 				curSkill[i].Percentage = skills[i].Percentage;
	// 				setCurskills(curSkill);
	// 			}
	// 		});
	// 	}else{
	// 		return
	// 	}
	// }

	// const option = useMemo(()=>{
	// 	return{
	// 		root : null,
	// 		threshold : 0
	// 	}
	// },[targetRef]);

	// useEffect(() => {
	// 	const observer = new IntersectionObserver(callback,option);
	// 	if(targetRef) observer.observe(targetRef.current);
	// },[targetRef]);

	return(
		<>
			<div className="bio_data_stats" ref={targetRef}>
				{curSkill.map(({Name:name,Percentage:per},i) => {
					return(
							<div className="bio_stats" key={i}>
								<h3>{name}</h3>
								<div className="bio_progress_bas">
									<div className="bio_progress_level" style={{width:`${per}%`}}>
										<span style={{left:`${per-4}%`}}>{`${per}%`}</span>
									</div>
								</div>
							</div>
						);
				})}	

			</div>
		</>
		);
}

export default ProgressBar;