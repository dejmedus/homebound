import React from 'react'

const FeatureCard = ({ img, alt, title, desc }) => {
    return (
        <div className='flex-1 grid justify-items-center gap-2 bg-stone-100 dark:bg-stone-600 rounded py-6 px-4 shadow-md'>
            <img className='h-24' src={img} alt={alt} />
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
    )
}

export default FeatureCard