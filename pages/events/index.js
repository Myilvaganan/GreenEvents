import Layout from '@/components/Layout';
import styles from '@/styles/MainPage.module.css';
import { API_URL, PAGE_PER } from '@/config/index';
import EventItem from '@/components/EventItem';
import { motion } from 'framer-motion';
import { stagger, fadeInSide } from '@/animations/index';
import Pagination from '@/components/Pagination';

export default function EventsPage({ events, total, page }) {
	return (
		<Layout>
			<h1 className={styles.line}>Events</h1>
			{events.length === 0 && <h3>No Events to Show</h3>}
			<motion.div variants={stagger} initial='hidden' animate='show'>
				{events.map((evt) => <EventItem key={evt.id} evt={evt} />)}
			</motion.div>
			<Pagination page={page} total={total} />
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	const startPageItems = +page === 1 ? 0 : (+page - 1) * PAGE_PER;

	const totalEvents = await fetch(`${API_URL}/events/count`);

	const total = await totalEvents.json();

	const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PAGE_PER}&_start=${startPageItems}`);
	const events = await eventRes.json();

	return {
		props: { events, page: +page, total }
	};
}
