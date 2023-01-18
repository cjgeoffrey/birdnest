import { useMatches, useNavigate } from"@remix-run/react"


export default function GetPilotInfo() {
    //Get data from parent route
    const matches = useMatches()
    console.log(matches)

    const navigate = useNavigate()

    return(<>
    <p>Pilot Info</p>
    </>)
}