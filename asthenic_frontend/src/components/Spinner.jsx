import React from 'react'
import {ProgressBar as Loader} from 'react-loader-spinner'


const Spinner = ( {message} ) => {
    
    return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        <Loader
        height = "100"
        width = "100"
        borderColor = '#F4442E'
        barColor = "#00BFFF"
        className= "m-5"/>
        <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner