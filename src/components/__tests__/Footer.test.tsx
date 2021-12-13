import { render, screen } from "@testing-library/react";

import Footer from "../Footer";

const year = new Date().getFullYear();

describe("Rendering the Footer", () => {
  it("renders the footer details correctly", async () => {
    render(<Footer copyrightHolder="Cardboard Creations" />);

    expect(
      screen.getByText(`© ${year} Cardboard Creations. All rights reserved.`)
    ).toBeInTheDocument();
  });
});
