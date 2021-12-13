import { render, screen } from "@testing-library/react";

import ContactForm from "../ContactForm";

describe("Rendering the Contact Form", () => {
  it("renders the heading and description correctly", async () => {
    render(
      <ContactForm
        heading="Contact Us"
        description="Contact us today we will get back to you soon"
      />
    );

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(
      screen.getByText("Contact us today we will get back to you soon")
    ).toBeInTheDocument();
  });

  it("renders all the fields correctly", async () => {
    render(
      <ContactForm
        heading="Contact Us"
        description="Contact us today we will get back to you soon"
      />
    );

    expect(screen.getAllByTestId("contactField")).toHaveLength(4);
    expect(screen.getByText("Send")).toBeInTheDocument();
  });
});
