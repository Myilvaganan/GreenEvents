import Link from 'next/link';
import { PAGE_PER } from '@/config/index';

export default function Pagination({ page, total }) {
	const lastPage = Math.ceil(total / PAGE_PER);
	return (
		<div className='justify'>
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className='btn-secondary'>Prev</a>
				</Link>
			)}

			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className='btn-secondary '>Next</a>
				</Link>
			)}
		</div>
	);
}
