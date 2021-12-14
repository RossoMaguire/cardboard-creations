import { render, screen } from "@testing-library/react";

import PromoBanner from "../PromoBanner";

describe("Rendering the Promo Banner correctly", () => {
  it("renders the correct details without video", async () => {
    render(
      <PromoBanner
        tagline="my test tagline"
        heading="my test heading"
        description="my test desc"
        buttonText="my btn text"
        buttonUrl="https://example.com"
      />
    );

    expect(screen.queryByTestId("promo-banner")).not.toHaveClass("video_wrap");
    expect(screen.getByText("my test tagline")).toBeInTheDocument();
    expect(screen.getByText("my test heading")).toBeInTheDocument();
    expect(screen.getByText("my test desc")).toBeInTheDocument();
    expect(screen.getByText("my btn text")).toBeInTheDocument();
    expect(screen.getByTestId("link-button")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("renders the correct details with video", async () => {
    render(
      <PromoBanner
        tagline="my test tagline"
        heading="my test heading"
        description="my test desc"
        buttonText="my btn text"
        buttonUrl="https://example.com"
        video
      />
    );

    expect(screen.getByTestId("promo-banner")).toHaveClass("video_wrap");
  });
});
