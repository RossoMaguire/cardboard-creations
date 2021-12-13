import { render, screen } from "@testing-library/react";

import EtsyReviews from "../EtsyReviews";
import { mockReviews } from "../../common/mock_data";

describe("Rendering the Etsy Reviews", () => {
  it("renders the review details correcty", async () => {
    render(<EtsyReviews topRated={mockReviews} />);

    // it will have double what is on screen because the carousel loads 2 instances to show and hide
    expect(
      screen.getAllByText(
        "Great quality! Very sturdy! Will purchase from them in the future"
      )
    ).toHaveLength(2);
    expect(screen.getAllByTestId("StarBorderIcon")).toHaveLength(60);
  });
});
