//use Link component instead of href to prevent re-rendering everytime 

import { Link } from '@remix-run/react';
import DisplayDrones from '~/components/DisplayDrones'


import { useFetcher, useLoaderData } from "@remix-run/react";
import { extractDroneData } from "~/data/utilFunctions.server";
import { addDroneData, getDroneData } from "~/data/droneData.server";

import homeStyles from '~/styles/home.css'

import xml2js from "xml2js";
const parser = new xml2js.Parser();





export default function Drones() {
   

  return (
    <main id="content">
      <h1>Save Monadikuikka Project</h1>
      <p>Drone Watch</p>
    
      <p id="cta">
        <Link to="/drones">List of Violations</Link>
      </p>
    
    </main>
  );
}

//CSS links
export function links(){
  return [ {rel:'stylesheet', href:homeStyles}]
}


// export async function loader() {
//   //Getting data from the source and store to database
//   const droneDataApi = "http://assignments.reaktor.com/birdnest/drones"
//   const apiResponse = await fetch(droneDataApi);
//   const content = await apiResponse.text();
//   const objectFromXmlData = await parser.parseStringPromise(content);
//   const parsedXMLdata = await extractDroneData(objectFromXmlData);
//   //Extract data from the parsedXML and send to database 
//   const extractedData = await { ...parsedXMLdata };


//   //user data API
//   for (let i in extractedData) {
//       let userDataResponse = await fetch(`http://assignments.reaktor.com/birdnest/pilots/${extractedData[i].serialNumber}`)
//       const objectFromJson = await userDataResponse.json()
//       // console.log(objectFromJson)
//     }
// // console.log(extractedData)
//   const droneDataToDisplay = await getDroneData()
//   return droneDataToDisplay
  
 

//   //    For adding data to database
// }

// export async function action({request}){
//   const formData = await request.formData()
//   const violatorDrones = Object.fromEntries(formData)
//   console.log(violatorDrones)
 
  
 
//   // console.log(violatorDrones)
//     // for (let i in violatorDrones) {
//     //  console.log(violatorDrones)
//     //   // await addViolatorData(extractViolatorDrones[i]);
//     // }
//     // return extractViolatorDrones
// // }}
// return formData
// }





