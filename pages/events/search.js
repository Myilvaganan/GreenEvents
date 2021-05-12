import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function SearchPage({ events }) {
	const router = useRouter();

	return (
		<Layout title='Search Results'>
			<Link href='/events'>
				<a className='btn-secondary'>Go Back</a>
			</Link>
			<h1 className='line mt-2'>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => <EventItem key={evt.id} evt={evt} />)}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ eventName_contains: term },
				{ organizer_contains: term },
				{ description_contains: term },
				{ venue_contains: term }
			]
		}
	});

	const res = await fetch(`${API_URL}/events?${query}`);
	const events = await res.json();

	return {
		props: { events }
	};
}
