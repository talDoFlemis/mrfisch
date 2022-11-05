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
        const data = await prisma.user.findUnique({
          where: { id: query.id as string },
          include: { codes: { include: { user: true } } },
        });
        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }
    case "POST": {
      const { body } = req;
      try {
        const data = await prisma.user.update({
          where: { id: query.id as string },
          data: { name: body.name, image: body.image, isNew: false },
        });
        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        console.log(err);
        res.status(400).json(err.message);
      }
      break;
    }
  }
}
