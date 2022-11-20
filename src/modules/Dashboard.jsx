import { useState } from 'react'
import Userfront from "@userfront/react";
import { Link, Navigate, Form, redirect, useLoaderData } from 'react-router-dom'

import ChooseDate from '../components/ChooseDate'
import tt from '@tomtom-international/web-sdk-services';


const Dashboard = ({ location }) => {

    const [role, setRole] = useState(null);
    const [address, setAddress] = useState('');
    const [destination, setDestination] = useState('');
    const [addressCoord, setAddressCoord] = useState([])
    const [destinationCoord, setDestinationCoord] = useState([])
    const { userData } = useLoaderData();

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
    fillData(userData)

    const handleDriver = () => setRole('driver')
    const handleRider = () => setRole('rider')
    const roleNull = () => setRole(null)

    function callbackAddress(result) {
        if (result.results[0].position.lat !== '' && result.results[0].position.lng !== '') {
            setAddressCoord([result.results[0].position.lat, result.results[0].position.lng])
            console.log(addressCoord)
        }
    };

    function callbackDestination(result) {
        // console.log(result);
        // console.log(result.results[0]);
        // console.log(result.results[0].address.country);
        console.log(result.results[0].position.lng);
        console.log(result.results[0].position.lat);
        if (result.results[0].position.lat !== '' && result.results[0].position.lng !== '') {
            setDestinationCoord([result.results[0].position.lat, result.results[0].position.lng])
        }
    };

    const handleAddress = (e) => {
        setTimeout(() => {
            tt.services.fuzzySearch({
                key: process.env.REACT_APP_TOMTOM,
                query: e.target.value
            }).then(callbackAddress);
        }, 3000)
        setAddress(e.target.value)
    }
    const handleDestination = (e) => {
        setTimeout(() => {
            tt.services.fuzzySearch({
                key: process.env.REACT_APP_TOMTOM,
                query: e.target.value
            }).then(callbackDestination);
        }, 3000)
        setDestination(e.target.value)
        if (destinationCoord !== [] && destinationCoord !== []) {
            console.log('calculating distance');
            calculateDistance()
        }
    }
    function calculateDistance() {
        const coordString = `${addressCoord[0]},${addressCoord[1]}:${destinationCoord[0]},${destinationCoord[1]}`
        tt.services.calculateRoute({
            key: process.env.REACT_APP_TOMTOM,
            locations: coordString
        }).then(function (routeData) {
            console.log(routeData.toGeoJson());
        });
    }

    return (
        <div className='grid gap-2 pb-8'>
            {/* <h2 className='text-2xl pb-2'>Welcome {Userfront.user.name ? Userfront.user.name : ''}</h2> */}
            {(Userfront.accessToken() && (Userfront.user.username === 'null' || Userfront.user.username === '' || Userfront.user.name === '' || Userfront.user.name == null))
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
                                <div className='flex justify-center'>
                                    <Form method='post'>
                                        <ChooseDate />
                                        <div className='flex gap-4 items-center pt-2'>
                                            <label className='w-24 dark:text-zinc-50' htmlFor="startLocation">Starting Location: </label>
                                            <input className='w-48 rounded dark:text-zinc-900 capitalize' type="text" name="startLocation" id="startLocation"
                                                value={address} onChange={handleAddress}
                                            />
                                            <input className='w-48 rounded dark:text-zinc-900 capitalize' type="text" name="startLocation" id="startLocation"
                                                value={addressCoord}
                                            />
                                        </div>
                                        <div className='flex gap-4 items-center pt-2'>
                                            <label className='w-24 dark:text-zinc-50' htmlFor="destination">Destination: </label>
                                            <input className='w-48 rounded dark:text-zinc-900 capitalize' type="text" name="destination" id="destination"
                                                value={destination} onChange={handleDestination}
                                            />
                                            <input className='w-48 rounded dark:text-zinc-900 capitalize' type="text" name="startLocation" id="startLocation"
                                                value={destinationCoord}
                                            />
                                        </div>
                                        <div className='flex gap-4 items-center pt-2'>
                                            <label className='w-24 dark:text-zinc-50' htmlFor="passengerNum">Number of Riders: </label>
                                            <input className='w-28 rounded dark:text-zinc-900' max='12' min='1' defaultValue='1' type="number" name="passengerNum" id="passengerNum" />
                                        </div>
                                        <div className='flex gap-4 items-center pt-2'>
                                            <label className='w-24 dark:text-zinc-50' htmlFor="seatCost">Cost per Rider: </label>
                                            <input className='w-28 rounded dark:text-zinc-900' type="number" min='0' name="seatCost" id="seatCost" />
                                        </div>
                                        <div className='flex gap-4 items-center pt-2'>
                                            <label className='w-24 dark:text-zinc-50' htmlFor="vehicleType">Type of Vechicle: </label>
                                            <select className='rounded dark:text-zinc-900' name="vehicleType" id="vehicleType">
                                                <option value="four-door">4 Door Car</option>
                                                <option value="two-door">2 Door Car</option>
                                                <option value="truck">Truck</option>
                                                <option value="van">Van</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className='flex gap-2 mt-8 justify-center'>
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
}
function Card({ title, desc, onclick }) {
    return (
        <button onClick={onclick} className="py-8 rounded-lg shadow-md bg-white dark:bg-zinc-900 grid justify-center flex-1 hover:shadow-lg">
            <h5 className="text-zinc-900 dark:text-zinc-100 text-xl leading-tight font-medium mb-2">{title}</h5>
            <p className="text-zinc-700 dark:text-zinc-400 text-base">
                {desc}
            </p>
        </button>
    )
}

function fillData(userData) {
    if (!userData.data['about'] || !userData.data['trips']) {
        if (!userData.data['about'] && !userData.data['trips']) {
            Userfront.user.update({
                data: {
                    about: '',
                    trips: []
                },
            });
        }
        else if (!userData.data['about']) {
            Userfront.user.update({
                data: {
                    about: '',
                    trips: userData.data['trips']
                },
            });
        }
        else if (!userData.data['trips']) {
            Userfront.user.update({
                data: {
                    about: userData.data['about'],
                    trips: []
                },
            });
        }
    }
}

export default Dashboard

export async function loader() {
    const userData = await Userfront.user
    return { userData };
}

export async function action({ request }) {
    let formData = await request.formData();
    let startDate = formData.get('startDate');
    let endDate = formData.get('endDate');
    let roundtrip = formData.get('roundtrip');
    let startLocation = formData.get('startLocation');
    let destination = formData.get('destination');
    let passengerNum = formData.get('passengerNum');
    let seatCost = formData.get('seatCost');

    let trip = {
        role: 'driver',
        currentPassengers: 0,
        startDate: startDate,
        endDate: endDate,
        roundtrip: roundtrip,
        startLocation: startLocation,
        destination: destination,
        passengerNum: passengerNum,
        seatCost: seatCost
    }
    Userfront.user.update({
        data: {
            about: Userfront.user.data['about'],
            trips: [...Userfront.user.data.trips, trip]
        },
    });
    return redirect('/your-trips')
}