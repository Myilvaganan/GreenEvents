import { parseCookies } from '@/helpers/index';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';

export default function dashboard({ events, token }) {

    const router = useRouter();
	const deleteEvent = async (id) => {
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/events/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message);
			} else {
				router.reload();
			}
		}
	};
	return (
		<Layout title='User Dashboard'>
			<div className={styles.dash}>
				<h1>Dashboard</h1>
				<h3>{(events[0].user.username).toUpperCase()}'s Events</h3>
				<div className={styles.dashboardEvents}>
					{events.map((evt) => <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />)}{' '}
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/events/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const events = await res.json();
	
	return {
		props: {
			events,
			token
		}
	};
}
