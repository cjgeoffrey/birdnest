//use Link component instead of href to prevent re-rendering everytime 

import { Link } from '@remix-run/react';

import { useFetcher, useLoaderData } from "@remix-run/react";
import { extractDroneData } from "~/data/utilFunctions.server";
import { addDroneData, getDroneData } from "~/data/droneData.server";


import xml2js from "xml2js";
import { useState } from "react";
import { useEffect } from "react";


const parser = new xml2js.Parser();


import homeStyles from '~/styles/home.css'


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

//Import data from MongoDB
// export async function loader({}){

// }
// export function loader() {
//   const droneDataToDisplay = getDroneData()
//   return droneDataToDisplay
// }

//exports style sheet to Links in root.jsx
//with this approach CSS is not downloaded unnecesarily
export function links(){
  return [ {rel:'stylesheet', href:homeStyles}]
}



