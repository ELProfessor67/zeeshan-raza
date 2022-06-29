import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import LanguageIcon from '@mui/icons-material/Language';

const Service = () => {
	return(
			<>
				<section className="section section_service">
					<div className="container">
						<h2 className="common_heading">Services Offers</h2>
						<p>We are providing following services. please contact us if you need any service. Thanks You!</p>
					</div>
					{/*Service offer card*/}
					<div className="container grid gird_three_column">
						<div className="Service_box">
							<DesktopMacIcon className="service_icon"/>
							<h3>Web Design</h3>
							<p>
								We are providing best web Designs services like E-commerce design, Portfolio design and Blog etc. If you need web Design service please contact us. Thanks You!
							</p>
						</div>
						<div className="Service_box">
							<CodeOffIcon className="service_icon"/>
							<h3>Web Development</h3>
							<p>
								We are providing best Websites services like Static web, Dynamic web and React App (single page application). If you need any service please contact us. Thanks You!
							</p>
						</div>
						<div className="Service_box">
							<PhotoCameraIcon className="service_icon"/>
							<h3>Photogrophy</h3>
							<p>
								We are providing best Photogrophy services. If you need any Photogrophy reletive services please contact us. Thanks You!
							</p>
						</div>
						<div className="Service_box">
							<AppSettingsAltIcon className="service_icon"/>
							<h3>Mobile Apps</h3>
							<p>
								We are providing best Mobile Apps services Android and IOS both. If you need any Mobile Apps services please contact us. Thanks You!
							</p>
						</div>
						<div className="Service_box">
							<LanguageIcon className="service_icon"/>
							<h3>User Interface</h3>
							<p>
								We are providing best UI (User Interface). If you need any UI (User Interface) services please contact us. Thanks You!
							</p>
						</div>
						<div className="Service_box">
							<CollectionsIcon className="service_icon"/>
							<h3>Graphic Design</h3>
							<p>
								We are providing best Graphic Designing service like Photo Editing, Video Editing etc. If you need any Graphic Designing services please contact us. Thanks You!
							</p>
						</div>
					</div>
				</section>
			</>
		);
}

export default Service;