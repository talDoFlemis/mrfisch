import DeleteCodeButton from "@components/code/DeleteCodeButton";
import { createMockRouter } from "@test-utils/createMockRouter";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ToastContainer } from "react-toastify";

const user = userEvent.setup();

const server = setupServer(
  rest.delete("/api/codes/777", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Testing delete code button", () => {
  it("Should be rendered as disabled", () => {
    const router = createMockRouter({ query: { id: "777" } });
    render(<DeleteCodeButton id="777" router={router} disabled />);
    expect(getDelBtn()).toBeDisabled();
  });

  it("Change the text to deleting while posting", async () => {
    const router = createMockRouter({ query: { id: "777" } });
    render(<DeleteCodeButton id="777" router={router} />);
    expect(getDelBtn()).toBeInTheDocument();
    await user.click(getDelBtn());
    await waitForElementToBeRemoved(() => screen.getByText(/deleting/i));
  });

  it("Throw an error when not valid operation", async () => {
    server.use(
      rest.delete("/api/codes/777", (req, res, ctx) => {
        return res(ctx.status(409), ctx.json({ error: "error kkk" }));
      })
    );
    const router = createMockRouter({ query: { id: "777" } });
    render(
      <div>
        <ToastContainer />
        <DeleteCodeButton id="777" router={router} />
        );
      </div>
    );

    await user.click(getDelBtn());
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("Send an success message", async () => {
    const router = createMockRouter({ query: { id: "777" } });
    render(
      <div>
        <ToastContainer />
        <DeleteCodeButton id="777" router={router} />
        );
      </div>
    );

    await user.click(getDelBtn());
    expect(
      await screen.findByText(/code deleted with success/i)
    ).toBeInTheDocument();

    expect(router.push).toHaveBeenCalledWith("/codes");
    expect(router.push).toHaveBeenCalledTimes(1);
  });
});

const getDelBtn = () => {
  return screen.getByRole("button", { name: /delete code/i });
};
