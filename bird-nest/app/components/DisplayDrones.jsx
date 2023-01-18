import React, { useEffect, useState} from 'react'
import { useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import { index } from 'd3'
import { Link } from '@remix-run/react'

import droneStyles from './DisplayDrones.css'

const DisplayDrones = () => {
    const loaderData = useLoaderData()
    const submit = useSubmit()
    
    
    
    useEffect(() => setData(loaderData), [loaderData]);

    const [data, setData] = useState(loaderData)
    
    const ORIGIN = 250000
    const COORDINATES_FACTOR = 1000
    const NOFLYRADIUS = 100 *  COORDINATES_FACTOR
    const NOFLYZONE = ORIGIN + NOFLYRADIUS
    
    const feedData = data.map((data, index
      ) => {
      return {
        id: data.id,
        serialNumber: data.serialNumber,
        model: data.model,
        manufacturer: data.manufacturer,
        positionX: data.positionX,
        positionY: data.positionY,
        snapShotTime: data.snapShotTime
        
      };
    });

    
    //Find violators
    const permittedDistance =  Math.sqrt(Math.pow(NOFLYZONE-ORIGIN, 2) + Math.pow(NOFLYZONE-ORIGIN, 2))

    const violators = Object.keys(feedData).filter(( key) => {
      
       return Math.sqrt(Math.pow(feedData[key].positionX-ORIGIN, 2) + Math.pow(feedData[key].positionY-ORIGIN, 2)) < permittedDistance
       
    }).map((key)=> feedData[key])

    //Calculate violation distance
    const violationDistance = []
   for (let i in Object.keys(violators)){
    violationDistance.push ((Math.abs(Math.sqrt(Math.pow(violators[i].positionX-ORIGIN, 2) + Math.pow(violators[i].positionY-ORIGIN, 2)) - permittedDistance)/COORDINATES_FACTOR).toFixed(2))
     }

   violators.forEach((value, index) => {
    value.violationDistance = violationDistance[index]
   })

    function submitHandler() {
      submit(violators, {
        action: '/drones',
        method: 'post'
      })
    }

    useEffect(() => setData(loaderData), [loaderData]);


   useEffect(() => {
     const interval = setInterval(submitHandler, 2 * 1000);
     return () => clearInterval(interval)
   }, []);

    const displayData = violators.map((obj)=>{
      return <li className='note'key={obj.id}>
        <Link to={obj.id}>
          <p>{obj.model}</p>
        <p>{obj.serialNumber}</p>
        <p>{obj.violationDistance}</p>

        </Link>
      </li>
    })

  return (<>
    <form className='note-list' onSubmit={submitHandler}>
    </form>
    <ul>{displayData}</ul>
    </>
  )
}

export default DisplayDrones

export function links() {
  return [{ rel: 'stylesheet', href: droneStyles }];
}


