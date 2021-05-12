import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';
import { motion } from 'framer-motion';
import { fadeInSide } from '@/animations/index';

export default function EventItem({ evt }) {
	return (
		<motion.div className={styles.event} variants={fadeInSide}>
			<div className={styles.img}>
				<Image
					src={evt.image ? evt.image.formats.thumbnail.url : '/images/default-Image.jpg'}
					width={170}
					height={100}
				/>
			</div>

			<div className={styles.info}>
				<h3>{evt.eventName}</h3>
				<span>
					{new Date(evt.date).toDateString()} at {evt.time}
				</span>
			</div>

			<div className={styles.link}>
				<Link href={`/events/${evt.motto}`}>
					<a className='btn'>Details</a>
				</Link>
			</div>
		</motion.div>
	);
}
