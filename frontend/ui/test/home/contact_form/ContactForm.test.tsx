import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import { setup } from "../../util/mocks/mockRender";
import ContactForm from "@/app/[locale]/home/(contact-form)/ContactForm";
import { mockFetchResponse } from "@/test/util/mocks/mockFetch";

beforeEach(() => {
  global.fetch = jest.fn(
    (): Promise<Response> => Promise.resolve(mockFetchResponse({}))
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Contact form tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      test("renders contact form with all fields in all available languages", () => {
        setup({
          Component: <ContactForm />,
          locale: locale,
          messages: messages,
        });
        expect(
          screen.getByLabelText(messages.Index.contact.name + ":")
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText(messages.Index.contact.email + ":")
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText(messages.Index.contact.message + ":")
        ).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText(messages.Index.contact.name_placeholder)
        ).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText(messages.Index.contact.email_placeholder)
        ).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText(
            messages.Index.contact.message_placeholder
          )
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: messages.Index.contact.send_text })
        ).toBeInTheDocument();
      });

      it("updates form data on input change in all available languages", () => {
        setup({
          Component: <ContactForm />,
          locale: locale,
          messages: messages,
        });

        fireEvent.change(
          screen.getByLabelText(messages.Index.contact.name + ":"),
          {
            target: { value: "John Doe" },
          }
        );
        fireEvent.change(
          screen.getByLabelText(messages.Index.contact.email + ":"),
          {
            target: { value: "john@example.com" },
          }
        );
        fireEvent.change(
          screen.getByLabelText(messages.Index.contact.message + ":"),
          {
            target: { value: "This is the best product!" },
          }
        );

        expect(
          screen.getByLabelText(messages.Index.contact.name + ":")
        ).toHaveValue("John Doe");
        expect(
          screen.getByLabelText(messages.Index.contact.email + ":")
        ).toHaveValue("john@example.com");
        expect(
          screen.getByLabelText(messages.Index.contact.message + ":")
        ).toHaveValue("This is the best product!");
      });

      it("submits the form, resets fields and renders thank you in all available languages", async () => {
        setup({
          Component: <ContactForm />,
          locale: locale,
          messages: messages,
        });

        fireEvent.change(
          screen.getByLabelText(messages.Index.contact.name + ":"),
          {
            target: { value: "John Doe" },
          }
        );
        fireEvent.change(
          screen.getByLabelText(messages.Index.contact.email + ":"),
          {
            target: { value: "john@example.com" },
          }
        );
        fireEvent.change(
          screen.getByLabelText(messages.Index.contact.message + ":"),
          {
            target: { value: "This is the best product!" },
          }
        );

        fireEvent.click(
          screen.getByRole("button", { name: messages.Index.contact.send_text })
        );

        expect(
          await screen.findByText(messages.Index.contact.thank_you)
        ).toBeInTheDocument();

        expect(
          screen.getByLabelText(messages.Index.contact.name + ":")
        ).toHaveValue("");
        expect(
          screen.getByLabelText(messages.Index.contact.email + ":")
        ).toHaveValue("");
        expect(
          screen.getByLabelText(messages.Index.contact.message + ":")
        ).toHaveValue("");
      });
    });
  }

  it("shows validation errors if required fields are empty", async () => {
    const messages = locales.en.messages;
    const locale = locales.en.messages.Locale;

    setup({
      Component: <ContactForm />,
      locale: locale,
      messages: messages,
    });

    fireEvent.click(
      screen.getByRole("button", { name: messages.Index.contact.send_text })
    );

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

  it("makes an API call with correct data on form submission", async () => {
    const messages = locales.en.messages;
    const locale = locales.en.messages.Locale;

    setup({
      Component: <ContactForm />,
      locale: locale,
      messages: messages,
    });

    fireEvent.change(screen.getByLabelText(messages.Index.contact.name + ":"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(
      screen.getByLabelText(messages.Index.contact.email + ":"),
      {
        target: { value: "john@example.com" },
      }
    );
    fireEvent.change(
      screen.getByLabelText(messages.Index.contact.message + ":"),
      {
        target: { value: "This is the best product!" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: messages.Index.contact.send_text })
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contactForm",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "This is the best product!",
        }),
      })
    );
  });
});
