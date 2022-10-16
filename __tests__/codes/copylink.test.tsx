import CopyLink from "@components/code/CopyLink";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

const user = userEvent.setup();

beforeEach(() => {
  render(
    <>
      <ToastContainer />
      <CopyLink link="mrfisch.com" />
    </>
  );
});

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe("Testing the copy link btn", () => {
  it("Should render a btn with copy link text", () => {
    expect(getLinkBtn()).toBeInTheDocument();
  });

  it("Should change text to link copied after click", async () => {
    await user.click(getLinkBtn());
    expect(getCopiedText()).toBeInTheDocument();
  });

  it("Should render a toast with success after clicked", async () => {
    await user.click(getLinkBtn());
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("Should write the clipboard data with the link mrfisch.com", async () => {
    await user.click(getLinkBtn());
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("mrfisch.com");
  });
});

const getLinkBtn = () => {
  return screen.getByRole("button", { name: /copy link/i });
};

const getCopiedText = () => {
  return screen.getByText(/copied/i);
};
