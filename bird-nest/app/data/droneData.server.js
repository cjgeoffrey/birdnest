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

export async function getDrone(id) {
  try {
    const drone = await prisma.droneInfo.findFirst({
      where: { id },
    });
    return drone;
  } catch (error) {
    throw error;
  }
}

export async function addViolatorData(violatorData) {
  try {
    prisma.violators.createMany({
      id: violatorData.id,
      serialNumber: violatorData.serialNumber,
      model: violatorData.model,
      manufacturer: violatorData.manufacturer,
      positionX: violatorData.positionX,
      positionY: violatorData.positionY,
      snapShotTime: violatorData.snapShotTime,
    });
  } catch (error) {
    throw error;
  }
}
