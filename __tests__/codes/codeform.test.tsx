import CodeForm from "@components/code/CodeForm";
import {
  findByText,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

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
const clickSubmitBtn = async () => {
  await user.click(screen.getByRole("button", { name: /create/i }));
};
