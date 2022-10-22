import DashboardLayout from "@components/layout/DashboardLayout";
import { createMockRouter } from "@test-utils/createMockRouter";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";

const user = userEvent.setup();

describe("Testing the Dashboard layout", () => {
  it("Should have all links", async () => {
    const router = createMockRouter({});
    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <DashboardLayout>a</DashboardLayout>
        </RouterContext.Provider>
      );
    });

    expect(getLinkBtn("all codes")).toBeInTheDocument();
    expect(getLinkBtn("create")).toBeInTheDocument();
    expect(getLinkBtn("search")).toBeInTheDocument();
    expect(getLinkBtn("portulovers")).toBeInTheDocument();
    expect(getLinkBtn("settings")).toBeInTheDocument();
  });

  it("Should highlight the codes name", async () => {
    const router = createMockRouter({ pathname: "/codes" });
    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <DashboardLayout>a</DashboardLayout>
        </RouterContext.Provider>
      );
    });

    expect(getLinkBtn("all codes")).toHaveClass("text-accent");
  });

  it("Should highlight the create name", async () => {
    const router = createMockRouter({ pathname: "/create" });
    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <DashboardLayout>a</DashboardLayout>
        </RouterContext.Provider>
      );
    });

    expect(getLinkBtn("create")).toHaveClass("text-accent");
  });

  it("Should highlight the search name", async () => {
    const router = createMockRouter({ pathname: "/search" });
    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <DashboardLayout>a</DashboardLayout>
        </RouterContext.Provider>
      );
    });

    expect(getLinkBtn("search")).toHaveClass("text-accent");
  });

  it("Should highlight the portulovers name", async () => {
    const router = createMockRouter({ pathname: "/portulovers" });
    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <DashboardLayout>a</DashboardLayout>
        </RouterContext.Provider>
      );
    });

    expect(getLinkBtn("portulovers")).toHaveClass("text-accent");
  });

  it("Should highlight the settings name", async () => {
    const router = createMockRouter({ pathname: "/settings" });
    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <DashboardLayout>a</DashboardLayout>
        </RouterContext.Provider>
      );
    });

    expect(getLinkBtn("settings")).toHaveClass("text-accent");
  });
});

const getLinkBtn = (name: string) => {
  return screen.getByRole("link", { name: name });
};
