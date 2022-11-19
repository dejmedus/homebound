import { Link } from "react-router-dom";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

// import arrow from '../assets/icons/left-arrow.png'
import confused from '../assets/images/confused.png'

function Error() {
    let error = useRouteError();
    let message = 'Sorry, we got confused.';
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            message = 'This page doesn\'t exist!'
        }

        if (error.status === 401) {
            message = 'You aren\'t authorized to see this'
        }

        if (error.status === 503) {
            message = 'The site is taking a nap'
        
        }

        if (error.status === 418) {
            message = '🫖'
        }
    }

    return (
        <div className='flex flex-col gap-8 text-center bg-neutral-50 dark:bg-neutral-700 py-24 px-6 h-screen items-center pt-32'>
            <img className='w-32' src={confused} alt="thought bubble with containing tangled string" />
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">{message}</h1>
            <Link className='rounded-md bg-sky-500 py-2 px-4 text-white shadow-sm hover:bg-sky-400'
                to='/'
            >
            {/* <div className='flex gap-2'>
            <img src={arrow} alt="back arrow" />
                Return Home
            </div> */}
            Return Home
            </Link>
        </div>
    )
}

export default Error