import prisma from "../../database/prisma.js";

/**
 * Generates a unique userId from firstName + lastName.
 *
 * Rule:
 *   first 3 chars of firstName (lowercase)
 * + first 3 chars of lastName  (lowercase)
 * + 3-digit sequence (001, 002, …)
 *
 * Examples:
 *   Rahul Sharma  → rahsha001
 *   Rahul Sharma  → rahsha002  (if rahsha001 already exists)
 *   Amy Li        → amyli_001  (names shorter than 3 chars are used as-is)
 */
export async function generateUserId(
  firstName: string,
  lastName: string
): Promise<string> {
  // 1. Build the base prefix (up to 6 chars, all lowercase, alpha-only)
  const prefix =
    firstName.toLowerCase().replace(/[^a-z]/g, "").slice(0, 3) +
    lastName.toLowerCase().replace(/[^a-z]/g, "").slice(0, 3);

  // 2. Find all existing users whose userId starts with this prefix
  const existing = await prisma.user.findMany({
    where: {
      userId: { startsWith: prefix },
    },
    select: { userId: true },
    orderBy: { userId: "desc" },
  });

  // 3. Determine the next sequence number
  let maxSeq = 0;

  for (const row of existing) {
    const suffix = row.userId.slice(prefix.length);
    const num = parseInt(suffix, 10);
    if (!isNaN(num) && num > maxSeq) {
      maxSeq = num;
    }
  }

  const nextSeq = (maxSeq + 1).toString().padStart(3, "0");

  return `${prefix}${nextSeq}`;
}
