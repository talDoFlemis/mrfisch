import CopyLink from "@components/code/CopyLink";
import StealCodeButton from "@components/code/StealCodeButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

const user = userEvent.setup();
const code = "print('mrfisch')";

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe("Testing the Steal Code Btn", () => {
  beforeEach(() => {
    render(
      <>
        <ToastContainer />
        <StealCodeButton code={code} />
      </>
    );
  });

  afterEach(() => jest.clearAllMocks());

  it("Should render a btn with steal code text", () => {
    expect(getStealBtn()).toBeInTheDocument();
  });

  it("Should change text to copied after click", async () => {
    await user.click(getStealBtn());
    expect(getCopiedText()).toBeInTheDocument();
  });

  it("Should render a toast with success after clicked", async () => {
    await user.click(getStealBtn());
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("Should write the clipboard data with the code", async () => {
    await user.click(getStealBtn());
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it("Should not have hidden class and inline flex", async () => {
    await user.click(getStealBtn());
    expect(getCopiedText()).not.toHaveClass("hidden sm:inline-flex");
  });
});

it("Should have hidden class when toHide Props is passed", async () => {
  render(
    <>
      <ToastContainer />
      <StealCodeButton code={code} toHide />
    </>
  );
  await user.click(getStealBtn());
  expect(getCopiedText()).toHaveClass("hidden sm:inline-flex");
});

const getStealBtn = () => {
  return screen.getByRole("button", { name: /steal code/i });
};

const getCopiedText = () => {
  return screen.getByText(/copied/i);
};
