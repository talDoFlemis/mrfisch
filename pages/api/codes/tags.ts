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
        const s = new Set();
        const data = await prisma.code.findMany({});
        data?.map(({ tags }) => {
          if (Array.isArray(tags)) tags.forEach((tag) => s.add(tag));
        });
        const allTags = Array.from(s);
        console.log(allTags);

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
