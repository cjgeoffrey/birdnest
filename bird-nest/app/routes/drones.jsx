import { useFetcher, useLoaderData } from "@remix-run/react";
import { extractDroneData } from "~/data/utilFunctions.server";
import { addDroneData, getDroneData } from "~/data/droneData.server";


import xml2js from "xml2js";
import { useState } from "react";
import { useEffect } from "react";


const parser = new xml2js.Parser();

export default function DronesPosition() {
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

  // useEffect(()=>{
  //   document.addEventListener('visibilitychange', revalidate)
  //   return () => document.removeEventListener('visibilitychange', revalidate)
  // },[])

  useEffect(() => {
    const interval = setInterval(revalidate, 2 * 1000);
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

  //Fetch data in background





 




return(<>
<p>Resource</p>
</>)


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
  
  return { data: extractedData};

  //    For adding data to database
}


