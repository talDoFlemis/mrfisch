import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "POST": {
      const { body } = req;
      const data = { ...body };
      // data.api_key = process.env.CLOUDINARY_API_KEY as string;
      try {
        const resp = await axios.post(
          "https://api.cloudinary.com/v1_1/flemis/image/upload",
          data
        );
        // console.log(resp.data);
      } catch (error) {
        const err = error as Error;
        console.log(err);
        res.status(400).json(err.message);
      }
      break;
    }
  }
}
