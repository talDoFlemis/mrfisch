import CodeForm from "@components/code/CodeForm";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { CodeInterface } from "typings";
import { UserState } from "@supabase/auth-helpers-shared";
import mockedUserData from "@test-utils/mockedUserSession";

const user = userEvent.setup();

describe("Testing code form in anonymous user", () => {
  const onSubmit = jest.fn((data) => {
    return data;
  });

  const server = setupServer(
    rest.get("/api/codes/tags", (req, res, ctx) => {
      return res(ctx.delay(100), ctx.json([]));
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  it("Testing everythin filled with success", async () => {
    const { container } = render(<CodeForm postOperation={onSubmit} />);
    const tags = container.querySelector(`input[name="tags"]`) as Element;

    await user.type(getTitle(), "anon code");
    await user.type(getDescription(), "cool description");
    await user.type(tags, "mrfisch123hehe");
    await user.keyboard("Enter");
    await selectCodeLang("rust");
    await user.type(getCodeBlock(), "a cool code");
    await user.type(getDocumentation(), "a documentation");
    await clickSubmitBtn();

    expect(onSubmit).toHaveReturnedWith({
      code_block: "a cool code",
      code_title: "anon code",
      description: "cool description",
      documentation: "a documentation",
      is_public: true,
      language: "rust",
      tags: [],
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("Should have 2 fields required", async () => {
    render(<CodeForm postOperation={onSubmit} />);
    await clickSubmitBtn();
    await waitFor(() => {
      expect(getTitle()).toHaveErrorMessage(/title is a required field/i);
      expect(getCodeBlock()).toHaveErrorMessage(
        /code block is a required field/i
      );
    });
  });
});

describe("Testing edit form", () => {
  const onSubmit = jest.fn((data) => {
    return data;
  });

  const server = setupServer(
    rest.get("/api/codes/tags", (req, res, ctx) => {
      return res(ctx.delay(100), ctx.json([]));
    })
  );

  const baseValues: CodeInterface = {
    id: "222",
    code_block: "print('Me lhamo tubias')",
    description: "Description poggers",
    documentation: "Documentation",
    language: "python",
    inserted_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    code_title: "A cool title",
    is_public: true,
    tags: ["kkkk", "mrfisch"],
  };

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  it("Testing edit with user anon and code user anon", async () => {
    render(<CodeForm postOperation={onSubmit} initialValues={baseValues} />);

    await waitFor(() => {
      expect(getTitle()).toHaveValue(baseValues.code_title);
      expect(getDescription()).toHaveValue(baseValues.description);
      expect(getCodeBlock()).toHaveValue(baseValues.code_block);
      expect(getCodeLang()).toHaveValue(baseValues.language);
      expect(getDocumentation()).toHaveValue(baseValues.documentation);
    });

    await user.clear(getTitle());
    await user.type(getTitle(), "a title updated");
    await clickSubmitBtn();

    expect(onSubmit).toHaveReturnedWith({
      id: "222",
      code_title: "a title updated",
      description: "Description poggers",
      code_block: "print('Me lhamo tubias')",
      documentation: "Documentation",
      language: "python",
      is_public: true,
      tags: ["kkkk", "mrfisch"],
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("Testing edit with user anon and code user DEFINED", async () => {
    const initialValues: CodeInterface = {
      user: {
        id: "123",
        username: "flemis",
        avatar_url: "cool avatar",
        is_port: false,
        is_new: false,
        updated_at: new Date(Date.now()),
      },
      ...baseValues,
    };

    render(<CodeForm postOperation={onSubmit} initialValues={initialValues} />);

    await user.clear(getTitle());
    await user.type(getTitle(), "a title updated");

    expect(getSubmitBtn()).toBeDisabled();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("Testing edit with user DEFINED and code user anon", async () => {
    render(
      <CodeForm
        postOperation={onSubmit}
        initialValues={baseValues}
        user={mockedUserData}
      />
    );

    await user.clear(getTitle());
    await user.type(getTitle(), "a title updated");

    expect(getSubmitBtn()).toBeDisabled();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});

const getTitle = () => {
  return screen.getByRole("textbox", { name: /title/i });
};

const getDescription = () => {
  return screen.getByRole("textbox", { name: /description/i });
};

const getCodeLang = () => {
  return screen.getByRole("combobox", { name: /code language/i });
};

const selectCodeLang = async (lang: string) => {
  const dropdown = getCodeLang();
  await user.selectOptions(
    dropdown,
    within(dropdown).getByRole("option", { name: lang })
  );
};

const getCodeBlock = () => {
  return screen.getByRole("textbox", { name: /code block/i });
};

const getDocumentation = () => {
  return screen.getByRole("textbox", { name: /documentation/i });
};

const getSubmitBtn = () => {
  return screen.getByRole("button", { name: /create/i });
};

const clickSubmitBtn = async () => {
  await user.click(getSubmitBtn());
};
