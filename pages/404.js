import Layout from '@/components/Layout';
import styles from '@/styles/FourNotFour.module.css';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFoundPage() {
	return (
		<Layout title='404 | Page Not Found'>
			<div className={styles.error}>
				<h1>
					{' '}
					<FaExclamationTriangle /> 404 - Page Not Found
				</h1>
				<h4>Sorry, There is Nothing here...! So what, Let's Plant Together</h4>
				<br />
				<Link href='/'>Go To HomePage</Link>
			</div>
		</Layout>
	);
}
