import prisma from "@utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PATCH": {
      const { body } = req;
      try {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) throw new Error("You must me logged in");
        console.log(body);
        if (body.toFav) {
          await prisma.user.update({
            where: { id: session.user.id },
            data: { favorite_codes: { connect: { id: body.codeId } } },
          });
        } else {
          await prisma.user.update({
            where: { id: session.user.id },
            data: { favorite_codes: { disconnect: { id: body.codeId } } },
          });
        }

        res.status(201).json("Code updated with success");
      } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).json(err.message);
      }

      break;
    }
  }
}
