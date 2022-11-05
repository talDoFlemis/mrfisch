import CodesHeader from "@components/code/CodesHeader";
import { createMockRouter } from "@test-utils/createMockRouter";
import {
  act,
  queryAllByText,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Session } from "next-auth";
import { RouterContext } from "next/dist/shared/lib/router-context";

const user = userEvent.setup();
jest.mock("next-auth/react");

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
    const user: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "https://gmltbufzxjrgpbxxywpk.supabase.co/avatar_url/coolpick.png",
    };
    await act(async () => {
      render(<CodesHeader user={user} />);
    });

    expect(
      screen.getByRole("link", { name: /your profile need to be updated/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText("user image")).toBeInTheDocument();
  });

  it("Renders a header with a user without image", async () => {
    const user: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "",
    };

    await act(async () => {
      render(<CodesHeader user={user} />);
    });

    expect(screen.queryByAltText("user image")).not.toBeInTheDocument();
  });

  it("Renders a dropdown", async () => {
    const user: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "",
    };

    await act(async () => {
      render(<CodesHeader user={user} />);
    });

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Must be able to send to profile page", async () => {
    const userData: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "",
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

    expect(router.push).toHaveBeenCalledWith(
      `/user/${userData.id}/edit`,
      `/user/${userData.id}/edit`,
      {
        locale: undefined,
        scroll: undefined,
        shallow: undefined,
      }
    );
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("Must show portulover option for portulovers", async () => {
    const userData: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "PORTULOVER",
      image: "",
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
    expect(getPortLink()).toBeInTheDocument();
    await user.click(getPortLink());

    expect(router.push).toHaveBeenCalledWith("/portulovers", "/portulovers", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("Must not show portulover option for NORMAL user", async () => {
    const userData: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "",
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
    expect(screen.queryAllByText(/portulovers/i)).toStrictEqual([]);
  });

  it("Must show MY CODES option", async () => {
    const userData: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "",
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
    expect(getMyCodesLink()).toBeInTheDocument();
    await user.click(getMyCodesLink());

    expect(router.push).toHaveBeenCalledWith("/mycodes", "/mycodes", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("Must show FAVORITE CODES option", async () => {
    const userData: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "",
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
    expect(getFavorLink()).toBeInTheDocument();
    await user.click(getFavorLink());

    expect(router.push).toHaveBeenCalledWith(
      "/favoritecodes",
      "/favoritecodes",
      {
        locale: undefined,
        scroll: undefined,
        shallow: undefined,
      }
    );
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("Must be able to logout and send to home page", async () => {
    const userData: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
      image: "",
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
    await user.click(getLogoutBtn());

    expect(router.push).toHaveBeenCalledWith("/");
    expect(router.push).toHaveBeenCalledTimes(1);
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

const getPortLink = () => {
  return screen.getByText(/portulovers/i);
};

const getMyCodesLink = () => {
  return screen.getByText(/my codes/i);
};

const getFavorLink = () => {
  return screen.getByText(/favorite codes/i);
};
