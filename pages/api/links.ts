import prisma from "@utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET": {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session || session.user.role !== "PORTULOVER")
        throw new Error("UNAUTHORIZED");
      try {
        const data = await prisma.link.findMany({
          include: { user: true },
          orderBy: { updatedAt: "desc" },
        });
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).json(err.message);
      }

      break;
    }

    case "POST": {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session || session.user.role !== "PORTULOVER")
        throw new Error("UNAUTHORIZED");
      try {
        const data = await prisma.link.create({
          data: { url: body.url, title: body.title, userId: session.user.id },
          include: { user: true },
        });
        console.log(data);

        res.status(201).json(data);
      } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).send(err.message);
      }

      break;
    }

    case "PATCH": {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session || session.user.role !== "PORTULOVER")
        throw new Error("UNAUTHORIZED");
      try {
        const data = await prisma.link.update({
          where: { id: body.id as string },
          data: { url: body.url, title: body.title, userId: session.user.id },
          include: { user: true },
        });

        res.status(201).json(data);
      } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).send(err.message);
      }

      break;
    }

    case "DELETE": {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session || session.user.role !== "PORTULOVER")
        throw new Error("UNAUTHORIZED");
      try {
        const data = await prisma.link.delete({
          where: { id: body.id },
        });
        console.log(data);

        res.status(201).json(data);
      } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).send(err.message);
      }

      break;
    }
  }
}
