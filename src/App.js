import { Outlet, Navigate, Link } from "react-router-dom";
import Userfront from "@userfront/react";

import earth from './assets/images/earth.png'
import money from './assets/images/bank.png'
import path from './assets/images/puzzle.png'

import Header from './modules/Header'
import Footer from './modules/Footer'


const SignupForm = Userfront.build({
  toolId: process.env.REACT_APP_SIGNUP
});

const LoginForm = Userfront.build({
  toolId: process.env.REACT_APP_LOGIN
});

const PasswordResetForm = Userfront.build({
  toolId: process.env.REACT_APP_RESET
});


export default function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className="bg-neutral-50 dark:bg-neutral-800 dark:text-white flex-1 py-12 px-20">
        {/* <Routes>
          {!Userfront.accessToken()
            ? <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </>
            : <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/trip-calculator" element={<TripCalc />} />
              <Route path="/update-user" element={<UpdateUser />} action={updateUserAction} />
            </>}
          <Route path="/reset" element={<PasswordReset />} />
        </Routes> */}
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return <>
    <div className='flex gap-2'>
      <div className='flex-1 p-6 px-16 flex flex-col gap-2 text-black dark:text-white'>
        <h1 className='pb-2 text-5xl'>Homebound</h1>
        {/* <h2>All roads lead to Home</h2> */}
        <h3 className="text-2xl text-black/[.8] dark:text-white/[.8]">Find or offer a ride and get to the places <i>and people</i> that matter this holiday season.</h3>
        <p className="text-lg text-black/50 dark:text-white/50">Homebound is a rideshare service that connects travellers with passengers who'd like to tag along and share trip costs.</p>
        <p className="text-lg text-black/50 dark:text-white/50">Help bring an age old rule into the modern era: catch a ride and offer gas money.</p>
      </div>
      <SignupForm />
    </div>
    <div className='flex text-center gap-8 pt-20 pb-16 px-8 dark:text-white'>
      <FeatureCard img={earth} alt='planet earth' title='Do good for the planet' desc='Ridesharing cuts down your CO2 emissions by an average of 1,350lbs/year!' />
      <FeatureCard img={money} alt='piggy bank with coins' title='Take it easy on your wallet' desc='Our trip calculator helps you to determine an equitable passenger contribution.' />
      <FeatureCard img={path} alt='puzzle piece' title='Connect with your community' desc='Help your neighbours get where they need to go and make travel more accessible to all.' />
    </div>
  </>
}

function FeatureCard({ img, alt, title, desc }) {
  return (
    <div className='flex-1 grid justify-items-center gap-2 bg-neutral-100 dark:bg-neutral-600 rounded py-6 px-4 shadow-md'>
      <img className='h-24' src={img} alt={alt} />
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  )
}

function About() {
  return (
    <h1>About</h1>
  )
}

function TripCalc() {
  return (
    <h1>Trip Calculator</h1>
  )
}

// const update = (img, username, trips) => {
//   Userfront.user.update({
//     username: username,
//     image: img,
//     data: {
//       trips: trips,
//     },
//   });
// }


function Login() {
  return <div className='text-center'>
    <h2 className='pb-6'>Welcome Back!</h2>
    <LoginForm />
  </div>
}

function PasswordReset() {
  return <>
    <h2>Password Reset</h2>
    <PasswordResetForm />
  </>
}


function Dashboard() {
  function Auth({ location }) {

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
    return (
      <div className='grid gap-2'>
        <h1 className='text-2xl pb-2'>Find a Ride</h1>
        {(Userfront.accessToken() && (Userfront.user.username === 'null' || Userfront.user.username == ''))
          ? <div className="bg-blue-100 rounded-lg py-5 px-4 mb-4 text-base text-blue-700 mb-3" role="alert">
            🚙 <Link className="font-bold text-blue-800 underline hover:text-blue-600" to="/update-user">Update your account</Link> to offer or accept trips!
          </div>
          : <h2>ALL THE TRIPS HERE</h2>}
        {/* <pre>{user}</pre> */}
      </div>
    );
  }

  return <Auth></Auth>
}