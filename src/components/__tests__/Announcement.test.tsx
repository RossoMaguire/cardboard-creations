import { render, screen } from "@testing-library/react";

import Announcement from "../Announcement";

describe("Rendering the Announcement", () => {
  it("renders the message in the announcement bar correcty", async () => {
    render(<Announcement message="my message" />);

    expect(screen.getByText("my message")).toBeInTheDocument();
  });
});
