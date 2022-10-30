import prisma from "@utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      try {
        const data = await prisma.code.findMany({
          where: { userId: query.id as string },
          orderBy: { updated_at: "desc" },
        });
        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }
  }
}
