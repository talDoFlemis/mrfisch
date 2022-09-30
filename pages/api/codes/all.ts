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
        let { data, error } = await supabase
          .from("codes")
          .select(`*, user(*)`)
          .order("inserted_at", { ascending: false });

        if (error) throw error.message;

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }

      break;
    }

    case "POST": {
      const { body } = req;
      const { user } = await supabase.auth.api.getUserByCookie(req);

      try {
        if (!user) {
          body.is_public = true;
        }
        body.user = user?.id;

        const { error } = await supabase
          .from("codes")
          .insert([body], { returning: "minimal" });

        if (error) throw error.message;

        res.status(201).json("created with success");
      } catch (error) {
        res.status(400).json(error);
      }

      break;
    }
  }
}
