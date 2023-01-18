//use Link component instead of href to prevent re-rendering everytime 

import { Link } from '@remix-run/react';

import { useFetcher, useLoaderData } from "@remix-run/react";
import { extractDroneData } from "~/data/utilFunctions.server";
import { addViolatorData, addDroneData, getDroneData } from "~/data/droneData.server";


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

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data]);

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
console.log(violatorDrones)
  addViolatorData(violatorDrones)
}
  


export async function loader() {
  //Getting data from the source and store to database
  const apiResponse = await fetch(
    "http://assignments.reaktor.com/birdnest/drones"
  );
  const content = await apiResponse.text();
  const objectFromXmlData = await parser.parseStringPromise(content);
  const parsedXMLdata = await extractDroneData(objectFromXmlData);
  const extractedData = await { ...parsedXMLdata };
    // for (let i in extractedData) {
    //   await addDroneData(extractedData[i]);
    // }

    const droneDataToDisplay = await getDroneData()
  return extractedData, droneDataToDisplay
  
 

  //    For adding data to database
}

