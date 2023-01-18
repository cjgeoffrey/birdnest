//This component is rendered on all the available pages and therefore added to the root.jsx

import { NavLink } from '@remix-run/react'; //NavLink is simmilar to Link but has a special feature which styles active CSS class

function MainNavigation() {
  return (
    <nav id="main-navigation">
      
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink to="/drones">List of violations</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;