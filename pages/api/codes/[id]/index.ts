import { supabase } from "@utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      let resp = await supabase
        .from("codes")
        .select(`*, user(avatar_url, username)`)
        .eq("id", req.query.id)
        .single();

      let data = await resp.data;

      res.status(200).json(data);
      break;
  }
}
