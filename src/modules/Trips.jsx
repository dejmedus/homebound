import Userfront from "@userfront/react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July",
  "Aug", "Sept", "Oct", "Nov", "Dec"];

// https://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th
const suffix = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

const Trips = () => {

  const { tripsData } = useLoaderData();
  const [trips, setTrips] = useState(tripsData)
  const handleSetTrips = (arr) => setTrips(arr)
  
  return (
    <>
      <div className='text-2xl pb-6'>Trips</div>
      {trips && trips.length > 0
        ? trips.sort((trip) => trip.startDate).map(trip => {
          let wordDateStart = `${months[+trip.startDate.slice(0, 2) - 1]} ${+trip.startDate.slice(3, 5)}${suffix(+trip.startDate.slice(3, 5))}, ${trip.startDate.slice(6)}`;
          let wordDateEnd = '';
          if (trip.roundtrip === 'true') {
            wordDateEnd = `${months[+trip.endDate.slice(0, 2) - 1]} ${+trip.endDate.slice(3, 5)}${suffix(+trip.endDate.split(3, 5))}, ${trip.endDate.slice(6)}`
          }

          return <div key={trip.startDate + trip.destination} className='flex gap-2 mb-4 border-b border-zinc-800 dark:border-zinc-200 items-center mx-4'>
            <p className="font-medium text-sky-700">{trip.role}</p>
            <p><span className='font-medium'>Leave:</span> {wordDateStart}</p>
            {trip.roundtrip === 'true' ? <p><span className='font-medium'>Return:</span> {wordDateEnd}</p> : null}
            <p><span className='font-medium'>Begin:</span> {trip.startLocation}</p>
            <p><span className='font-medium'>Destination:</span> {trip.destination}</p>
            {trip.role === 'driver'
              ? <p><span className='font-medium'>Cost per Rider:</span> {trip.seatCost}</p>
              : <p><span className='font-medium'>Cost:</span> {trip.seatCost}</p>
            }
            <p><span className='font-medium'>Passengers:</span> {trip.currentPassengers}/{trip.passengerNum}</p>
            <div className='flex-1 text-right'>
              {trip.role === 'driver'
                ? <button className='font-medium text-red-400 hover:text-red-700' onClick={() => CancelTrip([trip.startDate, trip.destination], trips, handleSetTrips)}>Cancel Trip</button>
                : <button className='font-medium text-red-400 hover:text-red-700' onClick={() => CancelTrip([trip.startDate, trip.destination], trips, handleSetTrips)
                }>Leave Trip</button>
              }
            </div>
          </div>
        }
        )
        : <>
          <Link to='/'><p className='text-xl py-12 text-center font-medium hover:underline'>Nothing planned? Lets change that.</p></Link>
        </>
      }
    </>
  )
}


function CancelTrip(val, trips, handleSetTrips) {

  const date = val[0]
  const destination = val[1]

  let newArr = trips.filter(trip => {
    return trip.startDate !== date && trip.destination !== destination
  })

  Userfront.user.update({
    data: {
      about: Userfront.user.data['about'],
      trips: newArr
    },
  });
  handleSetTrips(newArr)
  return
}

export async function loader() {
  const tripsData = await Userfront.user.data['trips']
  return { tripsData };
}

export default Trips