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

20/01/23 - Obtained data through the action function, though the values in the array were merged as a single text file. The values required were seperated by commas and therefore string splitting was performed to extract the data. However, why the action function does not perform as expected need to be ascertained.

    With this achieved, serial numbers of the drones violating the limit were extracted and data fetching from the drone register was successful.

19/01/23 - The project requires a few fixes. The submission of processed data through action function did not return expected data - that contain the list of violators. Therefore, futher fix required.


 


