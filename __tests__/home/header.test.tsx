import Header from "@components/home/Header";
import { createMockRouter } from "@test-utils/createMockRouter";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";

const user = userEvent.setup();

describe("Testing the Header in home page", () => {
  it("On scrolled should have backdrop-blur", () => {
    render(<Header scrolled section="#create" />);
    expect(getHeader()).toBeInTheDocument();
    expect(getHeader()).toHaveClass("backdrop-blur-sm bg-neutral/60");
  });

  it("Should have 3 links in the header", () => {
    render(<Header scrolled section="" />);
    expect(getLinkBtn("create")).toBeInTheDocument();
    expect(getLinkBtn("share")).toBeInTheDocument();
    expect(getLinkBtn("about")).toBeInTheDocument();
  });

  it("When clicked should use router to push to a section", async () => {
    const router = createMockRouter({});
    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <Header section="" scrolled />)
        </RouterContext.Provider>
      );
    });

    await user.click(getLinkBtn("create"));
    expect(router.push).toHaveBeenCalledWith("/#create", "/#create", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    await user.click(getLinkBtn("share"));
    expect(router.push).toHaveBeenCalledWith("/#share", "/#share", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    await user.click(getLinkBtn("about"));
    expect(router.push).toHaveBeenCalledWith("/#about", "/#about", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
  });

  it("If section create should have create highlighted", () => {
    render(<Header scrolled section="create" />);
    expect(getLinkBtn("create")).toHaveClass("text-accent");
  });

  it("If section share should have share highlighted", () => {
    render(<Header scrolled section="share" />);
    expect(getLinkBtn("share")).toHaveClass("text-accent");
  });

  it("If section about should have about highlighted", () => {
    render(<Header scrolled section="about" />);
    expect(getLinkBtn("about")).toHaveClass("text-accent");
  });
});

const getHeader = () => {
  return screen.getByRole("banner");
};

const getLinkBtn = (name: string) => {
  return screen.getByRole("link", { name: name });
};
