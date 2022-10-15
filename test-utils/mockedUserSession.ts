import { UserState } from "@supabase/auth-helpers-shared";

export const mockedUserData: UserState = {
  user: {
    id: "222",
    app_metadata: { email: "mrfisch@flemis.com" },
    user_metadata: { fvckU: "fvck" },
    aud: "asdf",
    created_at: "2222222",
  },
  accessToken: null,
  isLoading: false,
  checkSession: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
};

export default mockedUserData;
