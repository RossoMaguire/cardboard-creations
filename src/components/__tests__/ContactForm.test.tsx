import { fireEvent, getByText, render, screen } from "@testing-library/react";

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

    expect(screen.getAllByTestId("contactField")).toHaveLength(3);
    expect(screen.getByText("Send")).toBeInTheDocument();
  });
});

describe("Contact Form logic", () => {
  it("shows a please enter all information error", async () => {
    render(
      <ContactForm
        heading="Contact Us"
        description="Contact us today we will get back to you soon"
      />
    );

    fireEvent.change(screen.getByLabelText("name"), {
      target: { value: "Ross Maguire" },
    });
    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "ross@maguire" },
    });

    // user clicks send when missing the message field
    fireEvent.click(screen.getByText("Send"));
    expect(
      screen.getByText("Please fill out all the information.")
    ).toBeInTheDocument();
  });

  it("shows an invalid email error", async () => {
    render(
      <ContactForm
        heading="Contact Us"
        description="Contact us today we will get back to you soon"
      />
    );

    // fill the email field with invalid email
    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "rossmaguire" },
    });

    expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
  });

  it("shows a successfully sent messsage", async () => {
    render(
      <ContactForm
        heading="Contact Us"
        description="Contact us today we will get back to you soon"
      />
    );

    // fill the fields with valid data
    fireEvent.change(screen.getByLabelText("name"), {
      target: { value: "Ross Maguire" },
    });
    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "ross@maguire" },
    });
    fireEvent.change(screen.getByLabelText("message"), {
      target: { value: "This is a message" },
    });

    expect(
      screen.getByText("Message sent successfully. Thank you!")
    ).toBeInTheDocument();
  });
});
