import prisma from "@utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  switch (method) {
    case "GET": {
      try {
        const data = await prisma.comment.findMany({
          where: { codeId: query.id as string },
          include: { user: true },
          orderBy: { updated_at: "desc" },
        });
        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }
    case "POST": {
      try {
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) throw new Error("Must be logged in");

        const data = await prisma.comment.create({
          data: {
            block: body.block,
            codeId: query.id as string,
            userId: session.user.id,
          },
          include: { user: true },
        });

        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }

    case "PATCH": {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (body?.userId === null) body.userId = undefined;
      if (session?.user.id !== body?.userId) {
        throw new Error("UNAUTORIZED");
      }

      const postData = {
        ...body,
        codeId: query.id as string,
      };

      try {
        const data = await prisma.comment.update({
          where: { id: body.id },
          data: postData,
          include: { user: true },
        });
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }

      break;
    }

    case "DELETE": {
      const { query, body } = req;
      const session = await unstable_getServerSession(req, res, authOptions);
      if (body?.userId === null) body.userId = undefined;
      if (session?.user.id !== body.userId) {
        throw new Error("UNAUTORIZED");
      }

      try {
        await prisma.comment.delete({ where: { id: body.id } });
        res.status(200).json({ message: "Deleted with success" });
      } catch (error) {
        res.status(409).send(error);
      }

      break;
    }
  }
}
