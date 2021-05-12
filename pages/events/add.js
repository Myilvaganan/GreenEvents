import { parseCookies } from '@/helpers/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function AddEventPage({token}) {
	const [ values, setValues ] = useState({
		eventName: '',
		organizer: '',
		venue: '',
		address: '',
		date: '',
		time: '',
		description: ''
	});

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		const hasEmptyFields = Object.values(values).some((element) => element === '');

		if (hasEmptyFields) {
			toast.error('Please fill in all fields');
		}

		const res = await fetch(`${API_URL}/events`, {
			method: 'POST',
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

	return (
		<Layout
			title='Add New Event'
			description='Events are there to identify locals to group together and make a way to plant the saplings'
			keywords='plants, events, addEvents, saplings, remoteLocation'
		>
			<Link href='/events'>
				<a className='btn-secondary'>Go Back</a>
			</Link>
			<h1 className='mt-2'>Add Event</h1>
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
						<input type='date' name='date' id='date' value={values.date} onChange={handleInputChange} />
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

				<input type='submit' value='Add Event' className='btn' />
			</form>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);

	return {
		props: {
			token
		}
	};
}
