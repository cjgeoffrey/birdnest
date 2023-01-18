export function extractDroneData(parsedObject) {
  const mainBranch = parsedObject.report;
  //Drones captured by the detector
  // const snapShotTime =

  const getDronesArray = mainBranch.capture[0].drone;

  //add snapshottime to individual drone data
  for (let i in getDronesArray) {
    let [newAltitute] = getDronesArray[i].altitude;
    let [newSerialNumber] = getDronesArray[i].serialNumber;
    let [newModel] = getDronesArray[i].model;
    let [newManufacturer] = getDronesArray[i].manufacturer;
    let [newMac] = getDronesArray[i].mac;
    let [newIpv4] = getDronesArray[i].ipv4;
    let [newIpv6] = getDronesArray[i].ipv6;
    let [newFirmware] = getDronesArray[i].firmware;
    let [newPositionX] = getDronesArray[i].positionX;
    let [newPositionY] = getDronesArray[i].positionY;

    getDronesArray[i].snapShotTime = new Date(
      mainBranch.capture[0].$.snapshotTimestamp
    );
    getDronesArray[i].altitude = newAltitute;
    getDronesArray[i].serialNumber = newSerialNumber;
    getDronesArray[i].model = newModel;
    getDronesArray[i].manufacturer = newManufacturer;
    getDronesArray[i].mac = newMac;
    getDronesArray[i].ipv4 = newIpv4;
    getDronesArray[i].ipv6 = newIpv6;
    getDronesArray[i].firmware = newFirmware;
    getDronesArray[i].positionX = +newPositionX;
    getDronesArray[i].positionY = +newPositionY;
  }
  return getDronesArray;
}
