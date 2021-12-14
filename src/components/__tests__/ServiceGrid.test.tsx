import { render, screen } from "@testing-library/react";

import ServiceGrid from "../ServiceGrid";

describe("Rendering the Service Grid correctly", () => {
  it("renders the correct details ", async () => {
    render(<ServiceGrid />);

    expect(screen.getByText("Recyclable and re-usable")).toBeInTheDocument();
    expect(screen.getByText("Customer Photos")).toBeInTheDocument();
    expect(screen.getByText("Have Questions?")).toBeInTheDocument();
    expect(screen.getByText("Learn more")).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
    expect(screen.getByText("See more")).toBeInTheDocument();
    expect(screen.getAllByTestId("link-button")).toHaveLength(3);
  });
});
