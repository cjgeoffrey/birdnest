import React from 'react'
import { useLoaderData } from '@remix-run/react'
import { index } from 'd3'

import droneStyles from './DisplayDrones.css'

const DisplayDrones = () => {
    const loaderData = useLoaderData()
    const ORIGIN = 250000
    const NOFLYRADIUS = 100000
    const NOFLYZONE = ORIGIN + NOFLYRADIUS
    
    const feedData = loaderData.map((data, index
      ) => {
      return {
        key: data.id,
        serialNumber: data.serialNumber,
        model: data.model,
        manufacturer: data.manufacturer,
        positionX: data.positionX,
        positionY: data.positionY,
        
      };
    });

    //Find violators
    const permittedDistance =  Math.sqrt(Math.pow(NOFLYZONE-ORIGIN, 2) + Math.pow(NOFLYZONE-ORIGIN, 2))

    const violators = Object.keys(feedData).filter(( key) => {
      
       return Math.sqrt(Math.pow(feedData[key].positionX-ORIGIN, 2) + Math.pow(feedData[key].positionY-ORIGIN, 2)) < permittedDistance
       
    }).map((key)=> feedData[key])

    //Get pilot info - only violators

    //Display pilot name email and phone number

    //Get closest confirmed distance to the nest

    //Immediately show the last 10 mins ??

    //refresh automatically 

    const displayData = violators.map((obj)=>{
      return <li className='note'key={obj.key}>
        <p>{obj.serialNumber}</p>
        <p>{obj.positionX}</p>
      </li>
    })

    
   
  return (
    <ul className='note-list'>
     {displayData}
    </ul>
  )
}

export default DisplayDrones

export function links() {
  return [{ rel: 'stylesheet', href: droneStyles }];
}
