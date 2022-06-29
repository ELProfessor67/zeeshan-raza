import {useState,useEffect} from 'react';
import {submitForm} from '../../Actions/message';
import {useDispatch, useSelector} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


export default function Contact({ showMap }){
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [subject, setSubject] = useState();
	const [message, setMessage] = useState();

	// submit forn data
	const dispatch = useDispatch();
	const formSubmit = (e) => {
		e.preventDefault();
		dispatch(submitForm(name,email,subject,message));
		setName('');
		setEmail('');
		setSubject('');
		setMessage('');
	}

	const {error, message:serverMess} = useSelector(state => state.skills);
	// console.log(serverMess)

	useEffect(() => {
		if(error)
		{
			toast.error(error, {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			dispatch({
				type : 'clearErr'
			});
		}

		if(serverMess)
		{
			toast.success(serverMess.message, {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,

			});

			dispatch({
				type : "clearMess"
			});
		}
	},[error,serverMess]);


	return(
			<>
				<section className="section section_contact">
					<div className="container" id="befareMap">
						<h2 className="common_heading">Contact Us</h2>
					</div>
					{ showMap ? <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14049.932558113234!2d79.45033553187272!3d28.313977120711108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a001777e0f4f65%3A0x7055ba160bdfbc10!2sThiriya%20Nizawat%20Khan%2C%20Uttar%20Pradesh%20243123!5e0!3m2!1sen!2sin!4v1651818087460!5m2!1sen!2sin" width="100%" height="450" style={{border : 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> : <></> }
					<div className="section_contact_main contact_container">
						<form onSubmit={formSubmit}>
							<div className="grid gird_two_column">
								<div>
									<label htmlFor="name">Name :</label>
									<input type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' required/>
								</div>
								<div>
									<label htmlFor="email">Email :</label>
									<input type="email" placeholder="Example@gmail.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' required/>
								</div>
							</div>
							<div>
								<label htmlFor="subject">Subject :</label>
								<input type="text" placeholder="Subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<label htmlFor="message">Message :</label>
								<textarea id="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} autoComplete='off' required/>
							</div>
							<div>
								<button type="submit" className="btn">Send Message</button>
							</div>
						</form>
					</div>
				</section>
				<ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					theme="dark"
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</>
		);
}