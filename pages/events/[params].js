import {useRouter} from 'next/router'


export default function EventPage() {
    const router = useRouter();
    console.log(router)
    return(
        <div>
            <h1>My Event</h1>
        </div>
    )
}