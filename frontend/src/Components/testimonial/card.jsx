import Avatar from '@mui/material/Avatar';

export default function Card({comment,name,avatar,Work}){
	return(
			<>
				<div className="swiper_client_msg">
					<p>
						{comment}
					</p>
				</div>
				<div className="swiper_client_data grid gird_two_column">
					<figure>
						<Avatar src={avatar.url} sx={{ width: '10rem', height: '10rem' }} loading='lazy'/>
					</figure>
					<div className="client_data_details">
						<p>{name}</p>
						<p>{Work}</p>
					</div>
				</div>
			</>
		);
}