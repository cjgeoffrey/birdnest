import { useLoaderData, useMatches, useNavigate } from"@remix-run/react"
import { json } from "d3"
import { getDrone } from "../data/droneData.server"


export default function GetPilotInfo() {
  

    const loaderData = useLoaderData()

  
    const droneSerialNumber = loaderData.serialNumber

    // const apiResponse =  fetch(
    //     `assignments.reaktor.com/birdnest/pilots/${droneSerialNumber}`
    //   );
    
    return(<>
    <p>Pilot Info</p>
    <nav>
        {/* <Link to="/pilotsInfo"></Link> */}
    </nav>
    <p></p>
    </>)
}


export async function loader({params}){
    const droneId = params.id

    const drone = getDrone(droneId)

   //const droneInfo = drone.serialNumber


    // const dronePilotInfo  = await fetch(
    //     `assignments.reaktor.com/birdnest/pilots/${droneId}`
    //   );
    return drone
}