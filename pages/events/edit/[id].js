import { parseCookies } from '@/helpers/index';
import { ToastContainer, toast } from 'react-toastify';
import { FaImage } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ImageUpload from '@/components/ImageUpload';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import Modal from '@/components/Modal';

export default function EditEventPage({ event, token }) {
	const [ values, setValues ] = useState({
		eventName: event.eventName,
		organizer: event.organizer,
		venue: event.venue,
		address: event.address,
		date: event.date,
		time: event.time,
		description: event.description
	});

	const [ imagePreview, setImagePreview ] = useState(event.image ? event.image.formats.thumbnail.url : null);

	const [ showModal, setShowModal ] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		const hasEmptyFields = Object.values(values).some((element) => element === '');

		if (hasEmptyFields) {
			toast.error('Please fill in all fields');
		}

		const res = await fetch(`${API_URL}/events/${event.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(values)
		});

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('No token included');
				return;
			}
			toast.error('Something Went Wrong');
		} else {
			const evt = await res.json();
			router.push(`/events/${evt.motto}`);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const imageUploaded = async (e) => {
		const res = await fetch(`${API_URL}/events/${event.id}`);
		const data = await res.json();
		setImagePreview(data.image.formats.thumbnail.url);
		setShowModal(false);
	};
	return (
		<Layout
			title='Edit Event'
			description='Events are there to identify locals to group together and make a way to plant the saplings'
			keywords='plants, events, addEvents, saplings, remoteLocation'
		>
			<Link href='/events'>
				<a className='btn-secondary'>Go Back</a>
			</Link>
			<h1 className='mt-2'>Edit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='eventName'>Event Name</label>
						<input
							type='text'
							id='eventName'
							name='eventName'
							value={values.eventName}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='performers'>Organizers</label>
						<input
							type='text'
							name='organizer'
							id='organizer'
							value={values.organizer}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Venue</label>
						<input type='text' name='venue' id='venue' value={values.venue} onChange={handleInputChange} />
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							name='date'
							id='date'
							value={moment(values.date).format('yyyy-MM-DD')}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input type='text' name='time' id='time' value={values.time} onChange={handleInputChange} />
					</div>
				</div>

				<div>
					<label htmlFor='description'>Event Description</label>
					<textarea
						type='text'
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}
					/>
				</div>

				<input type='submit' value='CONFIRM EDIT' className='btn-secondary' />
			</form>
			<h1>Event Image </h1>
			{imagePreview ? (
				<Image src={imagePreview} height={100} width={170} />
			) : (
				<div>
					<p>No Image Uploaded!</p>
				</div>
			)}
			<div>
				<button className='btn' onClick={() => setShowModal(true)}>
					<FaImage /> Set Image
				</button>
			</div>

			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload evtId={event.id} imageUploaded={imageUploaded} token={token} />
			</Modal>
		</Layout>
	);
}

export async function getServerSideProps({ params: { id }, req }) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/events/${id}`);
	const event = await res.json();

	return {
		props: { event, token }
	};
}
