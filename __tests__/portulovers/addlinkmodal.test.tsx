import AddLinkModal from "@components/portulovers/AddLinkModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
const getLinks = () => {
  return "kkk";
};

describe("Testing the Add Link Modal", () => {
  beforeAll(() =>
    render(<AddLinkModal user_id="tubiasreidelas" getLinks={getLinks} />)
  );

  it("Should have modal parts", () => {
    expect(
      screen.getByRole("heading", { name: /creating new link/i })
    ).toBeInTheDocument();
    expect(getTitleInput()).toBeInTheDocument();
    expect(getLinkInput()).toBeInTheDocument();
    expect(getSubmitBtn()).toBeInTheDocument();
    expect(getCloseBtn()).toBeInTheDocument();
  });
});

const getTitleInput = () => {
  return screen.getByPlaceholderText(/enter your title/i);
};

const getLinkInput = () => {
  return screen.getByPlaceholderText(/enter your link/i);
};

const getSubmitBtn = () => {
  return screen.getByRole("button", { name: /submit/i });
};

const getCloseBtn = () => {
  return screen.getByRole("button", { name: /close/i });
};
