import { createContext, useContext, useEffect, useState } from "react";

export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
};

export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};

export const AuthContext = createContext();

export const AuthProvider = ({ supabase, ...props }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(VIEWS.SIGN_IN);

  useEffect(() => {
    const activeSession = supabase.auth.session();
    setSession(activeSession);
    setUser(activeSession?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        switch (event) {
          case EVENTS.PASSWORD_RECOVERY:
            setView(VIEWS.UPDATE_PASSWORD);
            break;
          case EVENTS.SIGNED_OUT:
          case EVENTS.USER_UPDATED:
            setView(VIEWS.SIGN_IN);
            break;
          default:
        }

        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session: currentSession }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        view,
        signOut: () => supabase.auth.signOut(),
      }}
      {...props}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
