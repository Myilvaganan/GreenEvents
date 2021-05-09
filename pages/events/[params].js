import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function EventPage() {
	const router = useRouter();
	console.log(router);
	return (
		<Layout
			title='Green Events | View Event'
			description='Events are there to identify locals to group together and make a way to plant the saplings'
			keywords='nature, plants, motherNature, green, saveNature, loveNature, liveWithNature'
		>
			<h1>My Event</h1>
		</Layout>
	);
}
