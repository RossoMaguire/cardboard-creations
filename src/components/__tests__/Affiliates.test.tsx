import { render, screen } from "@testing-library/react";

import Affiliates from "../Affiliates";

describe("Rendering the Affiliate Logos", () => {
  it("renders the correct amount of logos", async () => {
    render(<Affiliates />);

    expect(screen.getAllByTestId("affiliate-logo")).toHaveLength(4);
  });
});
