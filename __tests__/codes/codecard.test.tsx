import CodeCard from "@components/code/CodeCard";
import { act, render, screen } from "@testing-library/react";
import { Session } from "next-auth";
import { CodeInterface } from "typings";

const codeCardData: CodeInterface = {
  id: "777",
  codeTitle: "a cool title",
  description: "description",
  language: "rust",
  codeBlock: "a code block",
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  numberOfHits: 0,
  tags: [],
};

describe("testing the code card", () => {
  it("Renders a code title", () => {
    render(<CodeCard {...codeCardData} />);
    expect(screen.getByText(codeCardData.codeTitle)).toBeInTheDocument(); // Search for a code title
  });

  it("Renders a code description", () => {
    render(<CodeCard {...codeCardData} />);
    expect(
      screen.getByText(codeCardData.description as string)
    ).toBeInTheDocument();
  });

  it("renders a C text", () => {
    render(<CodeCard {...codeCardData} />);
    expect(screen.getByText(/rust/i)).toBeInTheDocument();
  });

  it("Renders a view code button", () => {
    render(<CodeCard {...codeCardData} />);
    expect(
      screen.getByRole("link", { name: /view code/i })
    ).toBeInTheDocument();
  });

  it("Renders an anonymous username", () => {
    render(<CodeCard {...codeCardData} />);
    expect(screen.getByText(/anonymous/i)).toBeInTheDocument();
  });

  it("Renders an username", async () => {
    const userData: Session = {
      user: { id: "kkkk", name: "flemis", isNew: true, role: "NORMAL" },
      expires: "",
    };

    await act(async () => {
      render(<CodeCard {...codeCardData} user={userData} />);
    });
    expect(screen.getByText(/flemis/i)).toBeInTheDocument();
  });
});
