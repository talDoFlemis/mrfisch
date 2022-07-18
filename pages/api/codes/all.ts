import { supabase } from "@utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { CodeInterface } from "typings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        let resp = await supabase
          .from("codes")
          .select(`*, user(avatar_url, username)`)
          .order("inserted_at", { ascending: false });

        let data = resp.data;

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      const { body } = req;
      const { user } = await supabase.auth.api.getUserByCookie(req);
      console.log(user);

      if (user) {
        body.user = user.id;
      }

      const { data, error } = await supabase
        .from("codes")
        .insert([body], { returning: "minimal" });

      if (error) {
        res.status(400).json(error);
      }

      res.status(201).json("created with success");
  }
}
