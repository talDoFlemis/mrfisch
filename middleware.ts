import { supabase } from "@utils/supabaseClient";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserInterface } from "typings";

interface getUserInterface {
  data: UserInterface | null;
  error: string | null;
}

export async function middleware(req: NextRequest) {
  // if (req.nextUrl.pathname === "/codes") {
  //   return NextResponse.redirect(new URL("/stop", req.url));
  // }

  if (req.nextUrl.pathname.startsWith("/portulovers")) {
    return NextResponse.rewrite(new URL("/stop", req.url));
  }
}

async function getUser(req: NextRequest): Promise<getUserInterface> {
  const token = req.cookies.get("sb-access-token");

  if (!token) {
    return {
      data: null,
      error: "There is no supabase token in request cookies",
    };
  }

  supabase.auth.setAuth(token);
  const { data, error } = await supabase
    .from<UserInterface>("profiles")
    .select()
    .single();

  if (error) {
    return { data: null, error: `Supabase returned with error ${error}` };
  }

  return { data: data, error: null };
}
