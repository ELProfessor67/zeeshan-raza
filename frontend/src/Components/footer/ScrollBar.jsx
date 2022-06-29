import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { scroll } from '../../Actions/skills';

export default function ScrollBar({ ele }){
	return(
		<>
			<div className="scroll_to_top" onClick={() => scroll(ele)}>
				<ArrowUpwardIcon/>
			</div>
		</>
		);
}