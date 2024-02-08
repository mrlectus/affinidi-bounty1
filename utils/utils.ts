import { prisma } from "@/storage/prisma";
import { getSession } from "@auth0/nextjs-auth0";

/**
 * Gets user profile information from the Auth0 session.
 *
 * Returns an object with the user's nickname, email, given name,
 * and profile picture URL.
 */
export const getUserProfile = async () => {
  const session = await getSession();
  const user: Array<Record<string, string | string[]>> = session?.user?.profile;
  const nickname = user
    ?.map((p) => p.nickname)
    .filter((p) => p !== undefined)[0];
  const email = user?.map((p) => p.email).filter((p) => p !== undefined)[0];
  const givenName = user
    ?.map((p) => p.givenName)
    .filter((p) => p !== undefined)[0];
  const picture = user?.map((p) => p.picture).filter((p) => p !== undefined)[0];
  return { nickname, email, givenName, picture };
};

/**
 * Creates a new user record in the database if one does not already exist with the given email.
 *
 * Checks if a user record already exists with the provided email address. If no user exists,
 * creates a new user record in the database with the email. Handles errors and ensures
 * database connection is closed.
 */
export const createUser = async (email: string) => {
  try {
    if (email) {
      const userExist = await prisma.user.findUnique({
        where: {
          email: email as string,
        },
      });
      if (!userExist) {
        await prisma.user.create({
          data: {
            email: email as string,
          },
        });
      }
    }
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
