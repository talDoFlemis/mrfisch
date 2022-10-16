import CodeCard from "@components/code/CodeCard";
import { render, screen } from "@testing-library/react";
import { CodeInterface, UserInterface } from "typings";

const codeCardData: CodeInterface = {
  id: "777",
  code_title: "a cool title",
  description: "description",
  language: "c",
  code_block: "a code block",
  inserted_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  is_public: true,
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

  it("Renders a public info", () => {
    render(<CodeCard {...codeCardData} />);
    expect(screen.getByText(/public/i)).toBeInTheDocument();
  });

  it("Renders a private info", () => {
    render(<CodeCard {...codeCardData} is_public={false} />);
    expect(screen.getByText(/private/i)).toBeInTheDocument();
  });

  it("renders a public description", () => {
    render(<CodeCard {...codeCardData} />);
    expect(screen.getByText(/public/i)).toBeInTheDocument();
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

  it("Renders flemis username", () => {
    const userData: UserInterface = {
      id: "",
      avatar_url: "",
      username: "flemis",
      updated_at: new Date(Date.now()),
      is_port: false,
      is_new: false,
    };
    render(<CodeCard {...codeCardData} user={userData} />);
    expect(screen.getByText(/flemis/i)).toBeInTheDocument();
  });
});
