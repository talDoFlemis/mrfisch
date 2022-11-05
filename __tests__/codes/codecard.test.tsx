import CodeCard from "@components/code/CodeCard";
import { act, render, screen } from "@testing-library/react";
import { Session } from "next-auth";
import { CodeInterface } from "typings";

const codeCardData: CodeInterface = {
  id: "777",
  code_title: "a cool title",
  description: "description",
  language: "rust",
  code_block: "a code block",
  inserted_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  number_views: 0,
  tags: [],
  favorited_by: [],
  comments: [],
  associatedTo: [],
  associatedBy: [],
};

describe("testing the code card", () => {
  it("Renders a code title", () => {
    render(<CodeCard {...codeCardData} />);
    expect(screen.getByText(codeCardData.code_title)).toBeInTheDocument(); // Search for a code title
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
    const userData: Session["user"] = {
      id: "kkkk",
      name: "flemis",
      isNew: true,
      role: "NORMAL",
    };
    await act(async () => {
      render(<CodeCard {...codeCardData} user={userData} />);
    });
    expect(screen.getByText(/flemis/i)).toBeInTheDocument();
  });
});
