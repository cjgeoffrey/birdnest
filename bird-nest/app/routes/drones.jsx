//use Link component instead of href to prevent re-rendering everytime 

import { Link } from '@remix-run/react';
import { json } from 'react-router-dom';

import {  useFetcher, useLoaderData } from "@remix-run/react";
import { extractDroneData, toObject } from "~/data/utilFunctions.server";
import {  addDroneData, getDroneData } from "~/data/droneData.server";

import { redirect } from '@remix-run/node';
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
    const interval = setInterval(revalidate, 15 * 1000);
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


export async function action({request, params}){
  const formData = await request.formData()
  
  const violatorDrones = Object.fromEntries(formData)


 

  //FormEntries return text - need fixing at origin object
  const violatorIdText = violatorDrones.id
  const violatorIdTextToArray = violatorIdText.split(",")

  const violatorSerialNumberText = violatorDrones.serialNumber
  const violatorSerialNumberTextToArray = violatorSerialNumberText.split(",")


  const violatorModelText = violatorDrones.model
  const violatorModelTextToArray = violatorModelText.split(",")

  const violatorManufacturerText = violatorDrones.manufacturer
  const violatorManufacturerTextToArray = violatorManufacturerText.split(",")

  const violatorPositionXText = violatorDrones.positionX
  const violatorPositionXTextToArray = violatorPositionXText.split(",")

  const violatorPositionYText = violatorDrones.positionY
  const violatorPositionYTextToArray = violatorPositionYText.split(",")

  const violatorSnapShotTimeText = violatorDrones.snapShotTime
  const violatorSnapShotTimeTextToArray = violatorSnapShotTimeText.split(",")

  const violatorviolationDistanceText = violatorDrones.violationDistance
  const violatorviolationDistanceTextToArray = violatorviolationDistanceText.split(",")

//Convert extracted values to objects
  const createActionDataObject = toObject(violatorIdTextToArray)
  for ( let i in violatorSerialNumberTextToArray){
    createActionDataObject[i].serialNumber = violatorSerialNumberTextToArray[i]
  }

  for ( let i in violatorModelTextToArray){
    createActionDataObject[i].model = violatorModelTextToArray[i]
  }

  for ( let i in violatorManufacturerTextToArray){
    createActionDataObject[i].manufacturer = violatorManufacturerTextToArray[i]
  }

  for ( let i in violatorPositionXTextToArray){
    createActionDataObject[i].positionX = violatorPositionXTextToArray[i]
  }

  for ( let i in violatorPositionYTextToArray){
    createActionDataObject[i].positionY = violatorPositionYTextToArray[i]
  }

  for ( let i in violatorSnapShotTimeTextToArray){
    createActionDataObject[i].snapShotTime = violatorSnapShotTimeTextToArray[i]
  }

  for ( let i in violatorviolationDistanceTextToArray){
    createActionDataObject[i].violationDistance = violatorviolationDistanceTextToArray[i]
  }



// console.log(violatorDrones)


  
  
//   console.log(createActionDataObject[0])
  
  //Get violator information from the database
  for (let i in createActionDataObject) 
  {
    // console.log(createActionDataObject[i].id);

    let userDataResponse = await fetch(`http://assignments.reaktor.com/birdnest/pilots/${createActionDataObject[i].id}`)
    console.log(createActionDataObject[i].id)
    // let jsonData =  await userDataResponse.json()
    // console.log(userDataResponse)
    // createActionDataObject[i].violatorData = jsonData
    // let responseJson = await userDataResponse.json()
    // createActionDataObject[i].violatorData = responseJson
    // console.log(responseJson)

    // let userId = params.serial
    // console.log(userId)
    

    // console.log(violatorSerialNumberTextToArray)
    // let userDataResponse = await fetch(`http://assignments.reaktor.com/birdnest/pilots/${violatorSerialNumberTextToArray[i]}`)
    // console.log(userDataResponse)
    // // const objectFromJson = await JSON.parse(userDataResponse)
    // // console.log(objectFromJson)
  }
 


 


return redirect('/drones')
}

export async function loader() {
  //Getting data from the source and store to database
  const droneDataApi = "http://assignments.reaktor.com/birdnest/drones"
  const apiResponse = await fetch(droneDataApi);
  const content = await apiResponse.text();
  const objectFromXmlData = await parser.parseStringPromise(content);
  const parsedXMLdata = await extractDroneData(objectFromXmlData);
  //Extract data from the parsedXML and send to database 
  const extractedData =  { ...parsedXMLdata };

  // let test = extractedData.getDronesArray

  // console.log(test)
  
  // console.log(extractedData)

//Send api data to database

   for (let i in extractedData) {
  
      await addDroneData(extractedData[i])};



// Get data from database
  const droneDataToDisplay = await getDroneData()


//Filter duplicate data - entries containing same serialNumber and snapShotTime
    keys = ['serialNumber', 'snapShotTime']
    filtered = droneDataToDisplay.filter(
    (set => obj =>
        (k => !set.has(k) && set.add(k))
        (keys.map(k => obj[k]).join('|'))
    ) 
    (new Set)
    )
  return filtered
  
}

export function links(){
    return [ ...dronesStyleLinks(), {rel:'stylesheet', href:homeStyles}]
  
  }