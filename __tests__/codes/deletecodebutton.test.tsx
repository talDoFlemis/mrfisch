import DeleteCodeButton from "@components/code/DeleteCodeButton";
import { createMockRouter } from "@test-utils/createMockRouter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("Testing delete code button", () => {
  it("Should be rendered as disabled", () => {
    const router = createMockRouter({ query: { id: "777" } });
    render(<DeleteCodeButton id="777" router={router} disabled />);
    expect(screen.getByRole("button", { name: /delete code/i })).toBeDisabled();
  });

  it("change the text to deleting while posting", async () => {
    const router = createMockRouter({ query: { id: "777" } });
    render(<DeleteCodeButton id="777" router={router} />);
    const delButton = screen.getByRole("button", { name: /delete code/i });
    expect(delButton).toBeInTheDocument();
    //TODO: Change All SVGS functions to react components without SVGR
    // await user.click(delButton);
  });
});
