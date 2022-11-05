import { Prisma } from "@prisma/client";
import prisma from "@utils/prisma";
import algoliasearch from "algoliasearch";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { AlgoliaInterface } from "typings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      try {
        const data = await prisma.code.findUnique({
          where: { id: query.id as string },
          include: {
            user: true,
            favorited_by: query.fav === "false" ? false : true,
          },
        });
        await prisma.code.update({
          data: { number_views: { increment: 1 } },
          where: { id: data?.id },
        });

        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }

    case "PUT": {
      const { body } = req;
      const session = await unstable_getServerSession(req, res, authOptions);

      const postData: Prisma.CodeCreateInput = {
        ...body,
        userId: session?.user.id,
      };
      if (body?.userId === null) body.userId = undefined;

      if (session?.user.id !== body?.userId)
        return res.status(401).send({ message: "UNAUTHORIZED" });

      const algoliaData: AlgoliaInterface = {
        objectID: "",
        code_title: body.code_title,
        description: body.description,
        _tags: body.tags,
        language: body.language,
        updated_at: new Date(),
        user: {
          name: session?.user.name ?? null,
          image: session?.user.image ?? null,
        },
        updated_at_timestamp: 0,
        code_block: body.code_block,
      };

      try {
        const data = await prisma.code.update({
          where: { id: query.id as string },
          data: { ...postData, updated_at: new Date() },
        });

        algoliaData.objectID = data.id;
        algoliaData.updated_at = data.updated_at;
        algoliaData.updated_at_timestamp = moment(data.updated_at).unix();

        const client = algoliasearch(
          "IEWGM4QLJ8",
          process.env.ALGOLIA_ADMIN_KEY as string
        );
        const index = client.initIndex("mrfisch");

        index
          .partialUpdateObject(algoliaData)
          .then(({ objectID }) => console.log(objectID));

        res.status(200).json("Updated with success");
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }

      break;
    }

    case "DELETE": {
      const { query, body } = req;
      const session = await getSession({ req });

      if (body?.userId === null) body.userId = undefined;
      if (session?.user.id !== body.userId)
        return res.status(401).send({ message: "UNAUTHORIZED" });

      try {
        await prisma.code.delete({ where: { id: query.id as string } });
        const client = algoliasearch(
          "IEWGM4QLJ8",
          process.env.ALGOLIA_ADMIN_KEY as string
        );
        const index = client.initIndex("mrfisch");

        index.deleteObject(query.id as string);
        res.status(200).json({ message: "Deleted with success" });
      } catch (error) {
        res.status(409).send(error);
      }

      break;
    }
  }
}
