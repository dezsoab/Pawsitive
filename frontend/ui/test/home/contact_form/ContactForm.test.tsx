import { fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import { setup } from "../../util/mocks/mockRender";
import ContactForm from "@/app/[locale]/home/(contact-form)/ContactForm";
import { mockFetchResponse } from "@/test/util/mocks/mockFetch";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve(
      mockFetchResponse({ message: "Thank you for reaching out!" })
    )
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Contact form tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      test("renders contact form with all fields", () => {
        setup({ Component: <ContactForm />, locale, messages });

        expect(
          screen.getByLabelText(messages.Index.contact.name + ":")
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText(messages.Index.contact.email + ":")
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText(messages.Index.contact.message + ":")
        ).toBeInTheDocument();
      });

      test("updates form data on input change", () => {
        setup({ Component: <ContactForm />, locale, messages });

        const nameInput = screen.getByLabelText(
          messages.Index.contact.name + ":"
        );
        const emailInput = screen.getByLabelText(
          messages.Index.contact.email + ":"
        );
        const messageInput = screen.getByLabelText(
          messages.Index.contact.message + ":"
        );

        act(() => {
          fireEvent.change(nameInput, { target: { value: "John Doe" } });
          fireEvent.change(emailInput, {
            target: { value: "john@example.com" },
          });
          fireEvent.change(messageInput, {
            target: { value: "This is the best product!" },
          });
        });

        expect(nameInput).toHaveValue("John Doe");
        expect(emailInput).toHaveValue("john@example.com");
        expect(messageInput).toHaveValue("This is the best product!");
      });

      test("submits the form and resets fields", async () => {
        setup({ Component: <ContactForm />, locale, messages });

        const nameInput = screen.getByLabelText(
          messages.Index.contact.name + ":"
        );
        const emailInput = screen.getByLabelText(
          messages.Index.contact.email + ":"
        );
        const messageInput = screen.getByLabelText(
          messages.Index.contact.message + ":"
        );
        const submitButton = screen.getByRole("button", {
          name: messages.Index.contact.send_text,
        });

        act(() => {
          fireEvent.change(nameInput, { target: { value: "John Doe" } });
          fireEvent.change(emailInput, {
            target: { value: "john@example.com" },
          });
          fireEvent.change(messageInput, {
            target: { value: "This is the best product!" },
          });
        });

        await act(async () => {
          fireEvent.click(submitButton);
        });

        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/mail/emailContactUs"),
          expect.objectContaining({
            method: "POST",
            headers: expect.objectContaining({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({
              senderName: "John Doe",
              senderEmail: "john@example.com",
              emailBody: "This is the best product!",
              language: locale,
            }),
          })
        );

        expect(nameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
        expect(messageInput).toHaveValue("");
      });
    });
  }

  test("shows validation errors if required fields are empty", async () => {
    const messages = locales.en.messages;
    setup({ Component: <ContactForm />, locale: "en", messages });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: messages.Index.contact.send_text })
      );
    });

    expect(
      screen.getByLabelText(messages.Index.contact.name + ":")
    ).toBeInvalid();
    expect(
      screen.getByLabelText(messages.Index.contact.email + ":")
    ).toBeInvalid();
    expect(
      screen.getByLabelText(messages.Index.contact.message + ":")
    ).toBeInvalid();
  });
});
