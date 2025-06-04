import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";

import locales from "../util/language/locales";
import { setup } from "../../test/util/mocks/mockRender";
import ContactPage from "../../app/[locale]/contact/page";
import { contacts } from "../../enums/contact";

describe("ContactPage tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders all sections and footer correctly", async () => {
        setup({
          Component: <ContactPage />,
          messages: messages,
          locale: locale,
        });

        await waitFor(() => {
          expect(
            screen.getByText(messages.Contact.hero.title)
          ).toBeInTheDocument();
          expect(
            screen.getByText(messages.Contact.hero.description)
          ).toBeInTheDocument();
          expect(
            screen.getByText(messages.Contact.hero.email_btn)
          ).toBeInTheDocument();
        });

        expect(
          screen.getByText(messages.Index.footer.paragraph)
        ).toBeInTheDocument();
      });
    });

    it("triggers email functionality", async () => {
      setup({
        Component: <ContactPage />,
        messages: messages,
        locale: locale,
      });

      await waitFor(() => {
        const emailBtn = screen.getByRole("link", {
          name: messages.Contact.hero.email_btn,
        });
        expect(emailBtn).toHaveAttribute("href", `mailto:${contacts.EMAIL}`);
      });
    });
  }
});
