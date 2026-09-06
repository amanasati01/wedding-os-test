import bcrypt from "bcrypt";
import prisma from "../database/prisma.js";

/**
 * Seeds the initial system owner user.
 *
 * Since roles now live in WeddingMember (not on User), this seed
 * only creates a User record. The OWNER role assignment will happen
 * when this user is added to their first wedding workspace.
 */
async function seedOwner() {
  try {
    let owner = await prisma.user.findUnique({
      where: { userId: "sysown001" },
      include: { memberships: true }
    });

    if (owner) {
      console.log("System owner already exists:", owner.userId);
      if (owner.memberships.length > 0) {
        return;
      }
      console.log("System owner has no memberships. Creating default wedding...");
    } else {
      const passwordHash = await bcrypt.hash("owner123", 12);

      owner = await prisma.user.create({
        data: {
          userId: "sysown001",
          firstName: "System",
          lastName: "Owner",
          displayName: "System Owner",
          passwordHash,
          isActive: true,
        },
        include: { memberships: true }
      });
    }

    const wedding = await prisma.wedding.create({
      data: {
        weddingName: "System Default Wedding",
        brideName: "Bride",
        groomName: "Groom",
        weddingDate: new Date("2026-12-31"),
      }
    });

    await prisma.weddingMember.create({
      data: {
        userId: owner.id,
        weddingId: wedding.id,
        role: "OWNER"
      }
    });

    console.log("System owner and default wedding created successfully:");
    console.log({
      id: owner.id,
      userId: owner.userId,
      displayName: owner.displayName,
      weddingId: wedding.id
    });
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedOwner();