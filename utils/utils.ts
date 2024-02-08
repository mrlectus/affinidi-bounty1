import { prisma } from "@/storage/prisma";
import { getSession } from "@auth0/nextjs-auth0";

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
