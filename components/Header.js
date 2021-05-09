import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header_right}>
				<Link href='/'>
					<div className={styles.logo}>
						<Image src='/logo.jpg' alt='Green Events' width={50} height={50} />
						<p>Green Events</p>
					</div>
				</Link>
			</div>

			<nav>
				<ul>
					<li>
						<Link href='/events'>
							<a>Events</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
