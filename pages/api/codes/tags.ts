import prisma from "@utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await prisma.tag.findMany({});

        const allTags = data.map((tag) => tag.tagName);
        res.setHeader(
          "Cache-Control",
          "s-maxage=60, stale-while-revalidate=120"
        );
        res.status(200).json(allTags);
      } catch (error) {
        res.status(400).json(error);
      }

      break;
  }
}
