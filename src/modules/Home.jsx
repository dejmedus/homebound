import Userfront from "@userfront/react";

import FeatureCard from '../components/FeatureCard'

import earth from '../assets/images/earth.png'
import money from '../assets/images/bank.png'
import path from '../assets/images/puzzle.png'


const Home = () => {
    
    const SignupForm = Userfront.build({
        toolId: process.env.REACT_APP_SIGNUP
    });

    return (
        <>
            <div className='flex gap-2'>
                <div className='flex-1 p-6 px-16 flex flex-col gap-2 text-black dark:text-white'>
                    <h1 className='pb-2 text-5xl'>Homebound</h1>
                    <h3 className="text-2xl text-black/[.8] dark:text-white/[.8]">Find or offer a ride and get to the places <i>and people</i> that matter this holiday season.</h3>
                    <p className="text-lg text-black/50 dark:text-white/50">Homebound is a rideshare service that connects travellers with passengers who'd like to tag along and share trip costs.</p>
                    <p className="text-lg text-black/50 dark:text-white/50">Help bring an age old rule into the modern era: catch a ride and offer gas money.</p>
                </div>
                <SignupForm />
            </div>
            <div className='flex text-center gap-8 pt-20 pb-16 px-8 dark:text-white'>
                <FeatureCard img={earth} alt='planet earth' title='Do good for the planet' desc='Ridesharing cuts your CO2 emissions down by an average of 1,350lbs/year!' />
                <FeatureCard img={money} alt='piggy bank with coins' title='Take it easy on your wallet' desc='Our trip calculator helps you to determine an equitable passenger contribution.' />
                <FeatureCard img={path} alt='puzzle piece' title='Connect with your community' desc='Help your neighbours get where they need to go and make travel more accessible to all.' />
            </div>
        </>
    )
}

export default Home