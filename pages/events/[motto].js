import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import { API_URL } from '@/config/index';
import styles from '@/styles/DetailedEvent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function EventPage({ event }) {
	const router = useRouter();

	return (
		<Layout
			title='Green Events | View Events'
			description='Events are there to identify locals to group together and make a way to plant the saplings'
			keywords='nature, plants, motherNature, green, saveNature, loveNature, liveWithNature'
		>
			<div className={styles.event}>
				<span>
					{new Date(event.date).toDateString()} @ {event.time}
				</span>
				<h1 className={styles.line}>{event.eventName}</h1>
				{/* 	<ToastContainer /> */}
				{event.image && (
					<div className={styles.image}>
						<Image
							src={
								event.image.formats.large ? (
									event.image.formats.large.url
								) : (
									event.image.formats.medium.url
								)
							}
							width={960}
							height={600}
						/>
					</div>
				)}

				<h3>Organizer:</h3>
				<p>{event.organizer}</p>
				<h3>More About Event:</h3>
				<p>{event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>

				<EventMap event={event} />
				<div className='mt-2 text-end'>
					<Link href='/events'>
						<a className='btn-secondary'>{'<<'} Go Back</a>
					</Link>
				</div>
			</div>
		</Layout>
	);
}

/* export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/events`);
	const events = await res.json();

	const paths = events.map((evt) => ({
		params: { motto: evt.motto }
	}));

	return {
		paths,
		fallback: true
	};
}

export async function getStaticProps({ params: { motto } }) {
	const response = await fetch(`${API_URL}/events?motto=${motto}`);

	const events = await response.json();

	return {
		props: {
			event: events[0]
		}
	};
}
 */
 export async function getServerSideProps({ query: { motto } }) {
  const res = await fetch(`${API_URL}/events?motto=${motto}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
  }
} 
