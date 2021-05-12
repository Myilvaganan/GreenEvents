import Link from 'next/link';
import Layout from '@/components/Layout';
import Image from 'next/image';
import styles from '@/styles/MainPage.module.css';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
import { motion } from 'framer-motion';
import { stagger } from '@/animations/index';

export default function HomePage({ events }) {
	return (
		<Layout>
			<h1 className={styles.line}>Upcoming Events</h1>
			{events.length === 0 && <h3>No Events to Show</h3>}

			{events.map((evt) => <EventItem key={evt.id} evt={evt} />)}

			<div className={styles.viewBtn}>
				{events.length > 0 && (
					<Link href='/events'>
						<a className='btn-secondary'>View All Events</a>
					</Link>
				)}
			</div>

			<div className={styles.section}>
				<div className={styles.svg}>
					<Image src='/tree.svg' height={600} width={600} />
				</div>
				<div>
					<blockquote className={styles.blockquote}>
						<p className={styles.quote}>
							Plant Trees or convey your message in this Grove to pay homage to India's Former President{' '}
							<strong> Dr. A.P.J. Abdul Kalam.</strong> He was also India's first Paryavaran Ambassador
							and took an environment oath that read as "I will plant and nurture 10 trees and will ensure
							that my family and neighbours also plant 10 trees each". His vision was{' '}
							<strong>
								<em>"Billion Trees for Billion People"</em>
							</strong>. Make a difference for our planet today!
						</p>
						<footer className={styles.blockquoteFooter}>― Grow-Trees.com</footer>
					</blockquote>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
	const events = await res.json();
	
	return {
		props: {events },
		revalidate: 1
	};
}
