import prisma from "@utils/prisma";
import { supabase } from "@utils/supabaseClient";
import algoliasearch from "algoliasearch";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { AlgoliaInterface, CodeInterface } from "typings";

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
          include: { user: true },
        });
        await prisma.code.update({
          data: { numberOfHits: { increment: 1 } },
          where: { id: data?.id },
        });
        res.status(200).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(400).json(err.message);
      }
      break;
    }

    // case "PUT": {
    //   const { body: supabaseData } = req;
    //   const { user } = await supabase.auth.api.getUserByCookie(req);
    //   if (user) {
    //     supabase.auth.session = () => ({
    //       access_token: req.cookies["sb-access-token"] as string,
    //       token_type: "bearer",
    //       user,
    //     });
    //   }
    //
    //   if (!user) {
    //     supabaseData.is_public = true;
    //   }
    //
    //   const algoliaData: AlgoliaInterface = {
    //     objectID: "",
    //     code_title: supabaseData.code_title,
    //     description: supabaseData.description,
    //     _tags: supabaseData.tags,
    //     is_public: supabaseData.is_public,
    //     language: supabaseData.language,
    //     updated_at: new Date(),
    //     user: { username: null, avatar_url: null },
    //     updated_at_timestamp: 0,
    //   };
    //
    //   try {
    //     const { data, error } = await supabase
    //       .from<CodeInterface>("codes")
    //       .upsert(supabaseData, { returning: "representation" });
    //
    //     if (error) throw error;
    //     if (!data) throw new Error("No data returned from supabase");
    //
    //     algoliaData.objectID = data[0].id;
    //     algoliaData.updated_at = data[0].updated_at;
    //     algoliaData.updated_at_timestamp = moment(data[0].updated_at).unix();
    //
    //     if (user) {
    //       const { data: profileData, error: profileError } = await supabase
    //         .from<UserInterface>("profiles")
    //         .select("username, avatar_url")
    //         .eq("id", user.id)
    //         .single();
    //
    //       if (profileError) throw profileError;
    //       if (!data) throw Error("Cant retrieve user from profile table");
    //
    //       algoliaData.user.username = profileData?.username ?? null;
    //       algoliaData.user.avatar_url = profileData?.avatar_url ?? null;
    //     }
    //
    //     const client = algoliasearch(
    //       "IEWGM4QLJ8",
    //       process.env.ALGOLIA_ADMIN_KEY as string
    //     );
    //     const index = client.initIndex("mrfisch");
    //
    //     index
    //       .partialUpdateObject(algoliaData)
    //       .then(({ objectID }) => console.log(objectID));
    //
    //     res.status(200).json("Updated with success");
    //   } catch (error) {
    //     console.log(error);
    //     res.status(400).send(error);
    //   }
    //
    //   break;
    // }
    case "DELETE": {
      const { query } = req;
      const { user } = await supabase.auth.api.getUserByCookie(req);

      if (user) {
        supabase.auth.session = () => ({
          access_token: req.cookies["sb-access-token"] as string,
          token_type: "bearer",
          user,
        });
      }

      try {
        const { count, error } = await supabase
          .from("codes")
          .delete({ count: "exact" })
          .match({ id: query.id });
        console.log(count);

        if (error) throw error;
        if (count === 0) throw Error("Code not found");

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
