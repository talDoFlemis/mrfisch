import { supabase } from "@utils/supabaseClient";
import algoliasearch from "algoliasearch";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { AlgoliaInterface, CodeInterface, UserInterface } from "typings";

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
          .order("updated_at", { ascending: false });

        if (error) throw error.message;

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }

      break;
    }

    case "POST": {
      const { body: supabaseData } = req;
      const { user } = await supabase.auth.api.getUserByCookie(req);

      if (!user) {
        supabaseData.is_public = true;
      }

      let algoliaData: AlgoliaInterface = {
        objectID: "",
        code_title: supabaseData.code_title,
        description: supabaseData.description,
        _tags: supabaseData.tags,
        is_public: supabaseData.is_public,
        language: supabaseData.language,
        updated_at: new Date(),
        user: { username: null, avatar_url: null },
        updated_at_timestamp: 0,
      };

      try {
        supabaseData.user = user?.id;
        const { data, error } = await supabase
          .from<CodeInterface>("codes")
          .insert([supabaseData], { returning: "representation" });

        if (error) throw error;
        if (!data) throw Error("No data returned from supabase");

        algoliaData.objectID = data[0].id;
        algoliaData.updated_at = data[0].updated_at;
        algoliaData.updated_at_timestamp = moment(data[0].updated_at).unix();

        if (user) {
          const { data: profileData, error: profileError } = await supabase
            .from<UserInterface>("profiles")
            .select("username, avatar_url")
            .eq("id", user.id)
            .single();

          if (profileError) throw profileError;
          if (!data) throw Error("Cant retrieve user from profile table");

          algoliaData.user.username = profileData?.username ?? null;
          algoliaData.user.avatar_url = profileData?.avatar_url ?? null;
        }

        const client = algoliasearch(
          "IEWGM4QLJ8",
          process.env.ALGOLIA_ADMIN_KEY as string
        );
        const index = client.initIndex("mrfisch");

        index
          .saveObject(algoliaData)
          .then(({ objectID }) => console.log(objectID));

        res.status(201).json("Code created with success");
      } catch (error) {
        res.status(400).send(error);
      }

      break;
    }
  }
}
