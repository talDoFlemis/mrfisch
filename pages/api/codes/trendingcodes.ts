import prisma from "@utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const data = await prisma.code.findMany({
          include: { user: true },
          orderBy: { number_views: "desc" },
          take: 6,
        });

        res.setHeader("Cache-Control", "public, s-maxage=1800");
        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }

      break;
    }
    case "PATCH": {
      const { body } = req;
      try {
        await prisma.code.update({
          where: { id: body.id },
          data: { number_views: { increment: 1 } },
        });

        res.status(201).json("Code updated with success");
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }

      break;
    }
  }
}
