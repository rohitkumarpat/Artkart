import { currentUser } from "@clerk/nextjs/server";
import { prismaclient } from "@/lib/db";

export async function saveuser() {
  const user = await currentUser();

  if (!user) return null; 

  let dbUser = await prismaclient.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await prismaclient.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.firstName,
        role:null
      },
    });
  }

  return dbUser;
}
