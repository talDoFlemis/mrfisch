import StealCodeButton from "@components/code/StealCodeButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup({ writeToClipboard: true });

const code = "a cool code to copy";

describe("Testing steal code button", () => {
  it("Renders a steal code button", () => {
    render(<StealCodeButton code={code} />);
    const stealButton = screen.getByRole("button", { name: /steal code/i });
    expect(stealButton).toBeInTheDocument();
  });
});
