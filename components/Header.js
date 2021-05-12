import styles from '@/styles/Header.module.css';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import React, { useContext } from 'react';
import Link from 'next/link';
import Search from './Search';
import AuthContext from '@/context/AuthContext';
import Image from 'next/image';

export default function Header() {
	const { user, logout } = useContext(AuthContext);
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
			<Search />
			<nav>
				<ul>
					<li>
						<Link href='/events'>
							<a>Events</a>
						</Link>
					</li>

					{user ? (
						<React.Fragment>
							<li>
								<Link href='/account/dashboard'>
									<a>Dashboard</a>
								</Link>
							</li>
							<li>
								<Link href='/events/add'>
									<a>Add Event</a>
								</Link>
							</li>
							<li>
								<button className='btn' onClick={() => logout()}>
									<FaSignOutAlt /> Logout
								</button>
							</li>
						</React.Fragment>
					) : (
						<li>
							<Link href='/account/login'>
								<a className='btn btn-icon'>
									<FaSignInAlt /> Login
								</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}
