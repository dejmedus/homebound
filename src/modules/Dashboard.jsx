import { useState } from 'react'
import Userfront from "@userfront/react";
import { Link, Navigate, Form, redirect } from 'react-router-dom'

const Dashboard = ({ location }) => {
    // function Auth({ location }) {

    const [role, setRole] = useState(null);

    if (!Userfront.accessToken()) {
        return (
            <Navigate
                to={{
                    pathname: "/login",
                    state: { from: location },
                }}
            />
        );
    }
    // const user = JSON.stringify(Userfront.user, null, 2);
    if (!Userfront.user.data['about'] || !Userfront.user.data['trips']) {
        if (!Userfront.user.data['about'] && !Userfront.user.data['trips']) {
            console.log('both');
            Userfront.user.update({
                data: {
                    about: '',
                    trips: []
                },
            });
        }
        else if (!Userfront.user.data['about']) {
            console.log('about');
            Userfront.user.update({
                data: {
                    about: '',
                    trips: Userfront.user.data['trips']
                },
            });
        }
        else if (!Userfront.user.data['trips']) {
            console.log('trips');
            Userfront.user.update({
                data: {
                    about: Userfront.user.data['about'],
                    trips: []
                },
            });
        }
        console.log(Userfront.user.data['trips'], Userfront.user.data['about']);
    }

    const handleDriver = () => setRole('driver')
    const handleRider = () => setRole('rider')
    const roleNull = () => setRole(null)

    return (
        <div className='grid gap-2'>
            <h2 className='text-2xl pb-2'>Welcome {Userfront.user.name ? Userfront.user.name : ''}</h2>
            {(Userfront.accessToken() && (Userfront.user.username === 'null' || Userfront.user.username == '' || Userfront.user.name == '' || Userfront.user.name == null))
                ? <div className="bg-sky-100 rounded-lg py-5 px-4 mb-4 text-base text-sky-700 mb-3" role="alert">
                    🚙 <Link className="font-bold text-sky-800 underline hover:text-sky-600" to="/update-user">Update your account</Link> to offer or accept trips!
                </div>
                : <div>
                    <h1 className='text-2xl py-6 text-center font-medium'>Plan Your Trip</h1>
                    {role == null
                        ? <div className='grid sm:flex px-2 md:px-18 lg:px-24 xl:px-32 gap-4 md:gap-6 lg:gap-8'>
                            <Card id='driver' title='Driver' desc='Plan a route and let passengers join your trip.' onclick={handleDriver}></Card>
                            <Card id='rider' title='Passenger' desc='Join a drivers route.' onclick={handleRider}></Card>
                        </div>
                        : role === 'driver'
                            ? <>
                                <h1>Driver</h1>
                                <div className='flex'>
                                    <Form method='post'>

                                        <div className='flex gap-2'>
                                            {/* <button onClick={roleNull}>Back</button> */}
                                            <button
                                                onClick={roleNull}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-sky-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type='submit'
                                                className="inline-flex justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-500"
                                            >
                                                List Trip
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </>
                            : <>
                                <h1>Passenger</h1>
                                <div className='flex'>
                                    <button onClick={roleNull}>Back</button>
                                </div>
                            </>
                    }
                </div>
            }
        </div>
    );

    // }

    // return <Auth></Auth>
}
function Card({ title, desc, onclick }) {
    return (
        <button onClick={onclick} className="py-8 rounded-lg shadow-md bg-white dark:bg-black grid justify-center flex-1 hover:shadow-lg">
            <h5 className="text-stone-900 text-xl leading-tight font-medium mb-2">{title}</h5>
            <p className="text-stone-700 text-base">
                {desc}
            </p>
        </button>
    )
}

export default Dashboard

export async function action({ request }) {
    let formData = await request.formData();
    let date = formData.get('date');
    let trip = {
        date: date
    }
    Userfront.user.update({
        data: {
            trips: [...Userfront.user.data.trips, trip]
        },
    });
    return redirect('/your-trips')
}