import { supabase } from "@utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const { data, error } = await supabase
          .from("codes")
          .select(`*, user(avatar_url, username)`)
          .eq("id", req.query.id)
          .single();

        if (error) throw error.message;

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }

      break;
    }

    case "PUT": {
      const { body } = req;

      try {
        const { user } = await supabase.auth.api.getUserByCookie(req);
        if (!user) {
          body.is_public = true;
        }

        const { error } = await supabase.from("codes").upsert(body);

        if (error) throw error.message;

        res.status(200).json("Updated with success");
      } catch (error) {
        res.status(400).json(error);
      }

      break;
    }
  }
}
