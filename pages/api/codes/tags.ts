import { supabase } from "@utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      let { data, error } = await supabase
        .from("codes")
        .select("tags")
        .not("tags", "is", null);

      if (error) {
        res.status(400).json(error);
      }
      let s = new Set();
      data?.map(({ tags }) => tags.forEach((tag: string) => s.add(tag)));
      let allTags = Array.from(s);

      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
      res.status(200).json(allTags);
      break;
  }
}
