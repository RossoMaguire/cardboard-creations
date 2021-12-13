import { render, screen } from "@testing-library/react";

import Button from "../Button";

describe("Rendering the Button", () => {
  it("renders a button that is enabled", async () => {
    render(<Button buttonText="my button text" />);

    expect(screen.getByText("my button text")).toBeInTheDocument();
  });

  it("renders a button that is disabled", async () => {
    render(<Button buttonText="my button text" disabled />);

    expect(screen.getByTestId("disabled-button")).toHaveClass(
      "disabled-button"
    );
  });

  it("renders a button that has a url", async () => {
    render(
      <Button buttonText="my button text" buttonURL="https://example.com" />
    );

    expect(screen.getByTestId("link-button")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });
});
