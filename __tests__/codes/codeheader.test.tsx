import CodesHeader from "@components/code/CodesHeader";
import { createMockRouter } from "@test-utils/createMockRouter";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";

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

const getLoginBtn = () => {
  return screen.getByRole("link", { name: /login/i });
};
