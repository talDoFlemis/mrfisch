import prisma from "@utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { CodeInterface } from "typings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  switch (method) {
    case "GET": {
      try {
        const data = await prisma.code.findUnique({
          where: { id: query.id as string },
          select: {
            associatedTo: {
              orderBy: { number_views: "desc" },
              take: query.take ? parseInt(query.take as string) : 25,
            },
          },
        });

        res.status(200).json(data?.associatedTo);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }
    case "PATCH": {
      try {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) return res.status(401).send({ message: "UNAUTHORIZED" });

        const codes = body?.map((code: CodeInterface) => ({
          id: code.id,
        }));

        const data = await prisma.code.update({
          where: { id: query.id as string },
          data: {
            associatedTo: {
              set: codes,
            },
          },
          select: { associatedTo: { orderBy: { number_views: "desc" } } },
        });

        res.status(200).json(data.associatedTo);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }
  }
}
