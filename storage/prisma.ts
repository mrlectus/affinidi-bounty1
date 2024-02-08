/**
 * Creates a new PrismaClient instance and exports it.
 * Disconnects the client after creating it to prevent open handles.
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
prisma.$disconnect();
