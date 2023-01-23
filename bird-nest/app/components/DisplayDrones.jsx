import React, { useEffect, useState} from 'react'
import { useActionData, useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import { index } from 'd3'
import { Link, Form } from '@remix-run/react'

import droneStyles from './DisplayDrones.css'

const DisplayDrones = () => {
    const loaderData = useLoaderData()
    // console.log(loaderData)
    
    const submit = useSubmit()
    const fetcher = useFetcher();

    const actionData = useActionData()
    

    const data = loaderData || fetcher.data

    const ORIGIN = 250000
    const COORDINATES_FACTOR = 1000
    const NOFLYRADIUS = 100 *  COORDINATES_FACTOR
    const NOFLYZONE = ORIGIN + NOFLYRADIUS

    //Find violators
    const permittedDistance =  Math.sqrt(Math.pow(NOFLYZONE-ORIGIN, 2) + Math.pow(NOFLYZONE-ORIGIN, 2))

    const violators = Object.keys(data).filter(( key) => {
      
       return Math.sqrt(Math.pow(data[key].positionX-ORIGIN, 2) + Math.pow(data[key].positionY-ORIGIN, 2)) < permittedDistance
       
    }).map((key)=> data[key])


    

    //Calculate violation distance
    const violationDistance = []
   for (let i in Object.keys(violators)){
    violationDistance.push ((Math.abs(Math.sqrt(Math.pow(violators[i].positionX-ORIGIN, 2) + Math.pow(violators[i].positionY-ORIGIN, 2)) - permittedDistance)/COORDINATES_FACTOR).toFixed(2))
     }

   violators.forEach((value, index) => {
    value.violationDistance = `${violationDistance[index]} m`
   })

   const modViolators = {...violators}
  //  console.log(modViolators)

  //Extract individual items to pass through submitHandler function
  //NOT ideal solution.. needs fixing
  const extractIds = []
   for (let i in modViolators) {
    extractIds.push(modViolators[i].id) 
   }

   const extractSerialNumber = []
   for (let i in modViolators) {
    extractSerialNumber.push(modViolators[i].serialNumber) 
   }

   const extractModel = []
   for (let i in modViolators) {
    extractModel.push(modViolators[i].model) 
   }

   const extractManufacturer = []
   for (let i in modViolators) {
    extractManufacturer.push(modViolators[i].manufacturer) 
   }

   const extractPositionX = []
   for (let i in modViolators) {
    extractPositionX.push(modViolators[i].positionX) 
   }

   const extractPositionY = []
   for (let i in modViolators) {
    extractPositionY.push(modViolators[i].positionY) 
   }

   const extractSnapShotTime = []
   for (let i in modViolators) {
    extractSnapShotTime.push(modViolators[i].snapShotTime) 
   }

   const extractViolatedDistance = []
   for (let i in modViolators) {
    extractViolatedDistance.push(modViolators[i].violationDistance) 
   }

    const violatorArray = modViolators ? {
    id: extractIds,
    serialNumber:extractSerialNumber,
    model: extractModel,
    manufacturer:extractManufacturer,
    positionX:extractPositionX,
    positionY: extractPositionY,
    snapShotTime: extractSnapShotTime,
    violationDistance: extractViolatedDistance
   } : {
    id: '',
        serialNumber:'',
        model: '',
        manufacturer: '',
        positionX: '',
        positionY: '',
        snapShotTime: '',
        violationDistance: ''
   }

  //  console.log(violatorArray)

    function submitHandler() {
      fetcher.submit(violatorArray, {
        action: '/drones',
        method: 'post'
      })
    }

    const revalidate = () => {
      if(document.visibilityState ==='visible'){
        fetcher.load("/drones")
      }
    }

   useEffect(() => {
     const interval = setInterval(submitHandler,15 * 1000);
     document.addEventListener('visibilitychange', revalidate)
     return () => clearInterval(interval), document.removeEventListener('visibilitychange', revalidate)
   }, []);

    const displayData = violators.map((obj)=>{
      return <li className='note'key={Math.random().toString(32).slice(2)}>
        <Link to={obj.id}>
          <p>{obj.model}</p>
        <p>{obj.serialNumber}</p>
        <p>{obj.violationDistance}</p>
        </Link>
      </li>
    })

  return (<>
    <Form>
      {/* <input type='hidden' value={violatorArray}/> */}
      <p>Does it work??</p>
    <ul>{displayData}</ul>
    
    </Form>
    </>
  )
}

export default DisplayDrones

export function links() {
  return [{ rel: 'stylesheet', href: droneStyles }];
}


