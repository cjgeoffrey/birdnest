//use Link component instead of href to prevent re-rendering everytime 

import { Link } from '@remix-run/react';


import homeStyles from '~/styles/home.css'


export default function Index() {
  return (
    <main id="content">
      <h1>Save Monadikuikka Project</h1>
      <p>Drone Watch</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
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

