import CodesList from "@components/code/CodesList";
import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import mockedCodeList from "@test-utils/mockedCodeList";
import { ReactElement } from "react";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

const server = setupServer(
  rest.get("/api/codes/all", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Testin Codes List", () => {
  it("Render no data at all", async () => {
    customRender(<CodesList />);
    await waitForElementToBeRemoved(getLoadingSpinner());

    expect(screen.queryAllByRole("heading")).toStrictEqual([]);
  });

  it("Display error while fetching", async () => {
    server.use(
      rest.get("/api/codes/all", (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Error kkk" }));
      })
    );
    customRender(<CodesList />);
    await waitForElementToBeRemoved(getLoadingSpinner());
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("Renders 3 Code Cards", async () => {
    server.use(
      rest.get("/api/codes/all", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockedCodeList));
      })
    );

    customRender(<CodesList />);
    await waitForElementToBeRemoved(getLoadingSpinner());

    mockedCodeList.map((code) =>
      expect(findCard(code.code_title)).toBeInTheDocument()
    );
  });
});

const getLoadingSpinner = () => {
  return screen.queryByRole("img", { hidden: true });
};

const findCard = (title: string) => {
  return screen.getByRole("heading", { name: title });
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      <ToastContainer />
      {children}
    </SWRConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });
