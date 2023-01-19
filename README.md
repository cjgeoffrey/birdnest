# birdnest

#######PROJECT DESCRIPTION

This project is a part of submission of application for the 'Developer Trainee' position at Reaktor.

The challenge involves fetching API data from 'assignments.reaktor.com/birdnest/drones', which returns information on drone positions. From this calculate drones that violate a certain region [No Drone Zone (NDZ)] away from the bird nest.

Next, from the drones that violated the NDZ, obtain information from the drone register 'assignments.reaktor.com/birdnest/pilots/:serialNumber' and publish the drone pilot's information along with the closest distance.

The API refresh every 2 seconds and the information need to be displayed for 10 minutes. Also, if the user visits the page, information from the previous 10 minutes need be displayed. 

The page should automatically refresh.

#######TECHNOLOGIES USED####

1. Remix: Remix, a React based fullstack framework, was utilised.

2. Prisma - was used for connecting with the database.

3. MongoDB Atlas was used for storing data.

#######STATUS

19/01 - The project requires a few fixes


 


