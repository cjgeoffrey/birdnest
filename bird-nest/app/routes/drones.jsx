//use Link component instead of href to prevent re-rendering everytime 

import { Link } from '@remix-run/react';
import { json } from 'react-router-dom';

import {  useFetcher, useLoaderData } from "@remix-run/react";
import { extractDroneData } from "~/data/utilFunctions.server";
import {  addDroneData, getDroneData } from "~/data/droneData.server";


import xml2js from "xml2js";
import { useState } from "react";
import { useEffect } from "react";


const parser = new xml2js.Parser();




import BirdNestEnvironment, {links as plotStyleLinks} from '../components/BirdNestEnvironment';
import DisplayDrones, { links as dronesStyleLinks} from '~/components/DisplayDrones'

import homeStyles from '~/styles/home.css'


export default function Index() {
   //Get data every 2 seconds
   const loaderData = useLoaderData();
   const [data, setData] = useState(loaderData);
   
   
 
   useEffect(() => setData(loaderData), [loaderData]);
 
   const fetcher = useFetcher();
 
   const revalidate = () => {
     if(document.visibilityState ==='visible'){
       fetcher.load("/drones")
     }
   }
  useEffect(() => {
    const interval = setInterval(revalidate, 200 * 1000);
    document.addEventListener('visibilitychange', revalidate)
    return () => clearInterval(interval),
      document.removeEventListener('visibilitychange', revalidate)
    ;
  }, []);

  return (
    <main id="content">
      <DisplayDrones />
    </main>)
}

//exports style sheet to Links in root.jsx

export function links(){
  return [ ...dronesStyleLinks(), {rel:'stylesheet', href:homeStyles}]

}
export async function action({request}){
  const formData = await request.formData()
  const violatorDrones = Object.fromEntries(formData)
 
  
 
  // console.log(violatorDrones)
    // for (let i in violatorDrones) {
    //  console.log(violatorDrones)
    //   // await addViolatorData(extractViolatorDrones[i]);
    // }
    // return extractViolatorDrones
// }}
return formData
}
  



export async function loader() {
  //Getting data from the source and store to database


  const droneDataApi = "http://assignments.reaktor.com/birdnest/drones"
  const apiResponse = await fetch(droneDataApi);
  const content = await apiResponse.text();
  const objectFromXmlData = await parser.parseStringPromise(content);
  const parsedXMLdata = await extractDroneData(objectFromXmlData);
  //Extract data from the parsedXML and send to database 
  const extractedData = await { ...parsedXMLdata };


  //user data API
  const droneUserDataApi = "http://assignments.reaktor.com/birdnest/pilots"
    for (let i in extractedData) {
      //await addDroneData(extractedData[i]);
      let userDataResponse = await fetch(`http://assignments.reaktor.com/birdnest/pilots/${extractedData[i].serialNumber}`)
      const objectFromJson = await userDataResponse.json()
      console.log(objectFromJson)
    }
// console.log(extractedData)
  const droneDataToDisplay = await getDroneData()
  return droneDataToDisplay
  
 

  //    For adding data to database
}

