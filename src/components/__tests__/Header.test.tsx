import { render, screen } from "@testing-library/react";

import Header from "../Header";
import { client } from "client";
import { mockMenuItems } from "components/common/mock_data";

describe("Rendering the Header", () => {
  it("renders the logo and sticky header correctly", async () => {
    render(<Header />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toHaveClass("sticky");
  });

  it("renders the header as non sticky", async () => {
    render(<Header notSticky />);

    expect(screen.queryByTestId("header")).not.toHaveClass("sticky");
  });

  it("renders the menu items correctly", async () => {
    render(<Header />);

    (client.useQuery().menuItems as unknown) = jest
      .fn()
      .mockResolvedValue(mockMenuItems);

    expect(screen.getByTestId("menu-item")).toHaveLength(8);
  });
});
