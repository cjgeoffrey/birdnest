import { prisma } from "./database.server";

export async function addDroneData(droneData) {
  try {
    return await prisma.droneInfo.create({
      data: {
        serialNumber: droneData.serialNumber,
        model: droneData.model,
        manufacturer: droneData.manufacturer,
        mac: droneData.mac,
        ipv4: droneData.ipv4,
        ipv6: droneData.ipv6,
        firmware: droneData.firmware,
        positionY: droneData.positionY,
        positionX: droneData.positionX,
        altitude: droneData.altitude,
        snapShotTime: droneData.snapShotTime,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getDroneData() {
  try {
    const droneDataToDisplay = await prisma.droneInfo.findMany({
      orderBy: { snapShotTime: "desc" },
    });
    return droneDataToDisplay;
  } catch (error) {
    throw error;
  }
}
