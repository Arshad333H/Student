import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user == null || !user.id) {
    throw new Error("something went wrong");
  }
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.given_name,
        email: user.email ?? "",
        profileImg:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }
  return NextResponse.redirect("http://localhost:3000/student");
}
