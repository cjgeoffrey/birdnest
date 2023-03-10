//use Link component instead of href to prevent re-rendering everytime 

import { Link } from '@remix-run/react';

import { getDroneData } from '~/data/droneData.server';

import BirdNestEnvironment, {links as plotStyleLinks} from '../components/BirdNestEnvironment';
import DisplayDrones, { links as dronesStyleLinks} from '~/components/DisplayDrones'

import homeStyles from '~/styles/home.css'


export default function Index() {
  return (
    <main id="content">
    
      {/* <DisplayDrones /> */}
      
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
  return [...plotStyleLinks(),...dronesStyleLinks(), {rel:'stylesheet', href:homeStyles}]
}

