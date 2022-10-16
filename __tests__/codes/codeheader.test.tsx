import CodesHeader from "@components/code/CodesHeader";
import { createMockRouter } from "@test-utils/createMockRouter";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { UserInterface } from "typings";

const user = userEvent.setup();

describe("Testing the CodesHeader without any user", () => {
  it("Renders a login button that push to /login", async () => {
    const router = createMockRouter({
      pathname: "/login",
    });

    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <CodesHeader />)
        </RouterContext.Provider>
      );
    });

    expect(getLoginBtn()).toBeInTheDocument();
    await user.click(getLoginBtn());
    expect(router.push).toHaveBeenCalledWith("/login", "/login", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    expect(router.push).toHaveBeenCalledTimes(1);
  });
});

describe("Testing the CodesHeader with user data", () => {
  it("Renders a header with a new user", async () => {
    const user: UserInterface = {
      id: "222",
      avatar_url: "https://gmltbufzxjrgpbxxywpk.supabase.co/coolpick.png",
      username: "taldoflemis",
      updated_at: new Date(Date.now()),
      is_port: false,
      is_new: true,
    };

    await act(async () => {
      render(<CodesHeader user={user} />);
    });

    expect(
      screen.getByRole("link", { name: /your profile need to be updated/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
  });

  it("Renders a header with a user without image", async () => {
    const user: UserInterface = {
      id: "222",
      avatar_url: "",
      username: "taldoflemis",
      updated_at: new Date(Date.now()),
      is_port: false,
      is_new: true,
    };

    await act(async () => {
      render(<CodesHeader user={user} />);
    });

    expect(screen.queryByAltText("avatar")).not.toBeInTheDocument();
  });

  it("Renders a dropdown", async () => {
    const user: UserInterface = {
      id: "222",
      avatar_url: "",
      username: "taldoflemis",
      updated_at: new Date(Date.now()),
      is_port: false,
      is_new: true,
    };

    await act(async () => {
      render(<CodesHeader user={user} />);
    });

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Must be able to send to profile page", async () => {
    const userData: UserInterface = {
      id: "222",
      avatar_url: "",
      username: "taldoflemis",
      updated_at: new Date(Date.now()),
      is_port: false,
      is_new: true,
    };

    const router = createMockRouter({
      pathname: "/codes",
    });

    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <CodesHeader user={userData} />)
        </RouterContext.Provider>
      );
    });

    await user.click(screen.getByRole("button"));
    expect(getProfileBtn()).toBeInTheDocument();
    await user.click(getProfileBtn());

    expect(router.push).toHaveBeenCalledWith("/profile", "/profile", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("Must be able to logout and send to home page", async () => {
    const userData: UserInterface = {
      id: "222",
      avatar_url: "",
      username: "taldoflemis",
      updated_at: new Date(Date.now()),
      is_port: false,
      is_new: true,
    };

    const router = createMockRouter({
      pathname: "/codes",
    });

    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <CodesHeader user={userData} />)
        </RouterContext.Provider>
      );
    });

    await user.click(screen.getByRole("button"));
    expect(getLogoutBtn()).toBeInTheDocument();
    //TODO: Handle supabase shit
    // await user.click(getLogoutBtn());
    //
    // expect(router.push).toHaveBeenCalledWith("/", "/", {
    //   locale: undefined,
    //   scroll: undefined,
    //   shallow: undefined,
    // });
    // expect(router.push).toHaveBeenCalledTimes(1);
  });
});

const getLoginBtn = () => {
  return screen.getByRole("link", { name: /login/i });
};

const getProfileBtn = () => {
  return screen.getByRole("link", { name: /profile/i });
};

const getLogoutBtn = () => {
  return screen.getByRole("menuitem", { name: /logout/i });
};
