import { render, screen } from "@testing-library/react";

import CTA from "../CTA";

describe("Rendering the CTA", () => {
  it("renders the heading and child paragraph correctly", async () => {
    render(
      <CTA title="Want to know more?" headingLevel="h2">
        <p>Follow us on Social Media</p>
      </CTA>
    );

    expect(screen.getByText("Want to know more?")).toBeInTheDocument();
    expect(screen.getByText("Follow us on Social Media")).toBeInTheDocument();
  });

  it("renders all the social media links", async () => {
    render(
      <CTA title="Want to know more?" headingLevel="h2">
        <p>Follow us on Social Media</p>
      </CTA>
    );

    expect(screen.getByTestId("InstagramIcon")).toBeInTheDocument();
    expect(screen.getByTestId("FacebookIcon")).toBeInTheDocument();
    expect(screen.getByTestId("TwitterIcon")).toBeInTheDocument();
  });
});
