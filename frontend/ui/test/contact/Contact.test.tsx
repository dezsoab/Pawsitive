import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import locales from "../util/language/locales";
import { setup } from "../../test/util/mocks/mockRender";
import { contacts } from "../../enums/contact";
import Contact from "../../app/[locale]/contact/(contact)/Contact";

describe("Contact tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders contact information correctly", () => {
        setup({
          Component: <Contact />,
          messages: messages,
          locale: locale,
        });

        expect(
          screen.getByText(messages.Contact.contact.info)
        ).toBeInTheDocument();
        expect(
          screen.getByText(`${"📍"} ${messages.Contact.contact.return}`)
        ).toBeInTheDocument();
        expect(
          screen.getByText(formatAddress(contacts.ADDRESS))
        ).toBeInTheDocument();
        expect(
          screen.getByText(`${"☎️"} ${messages.Contact.contact.tel}`)
        ).toBeInTheDocument();
        expect(screen.getByText(contacts.TEL)).toBeInTheDocument();
        expect(
          screen.getByText(`${"💌"} ${messages.Contact.contact.email}`)
        ).toBeInTheDocument();
        expect(screen.getByText(contacts.EMAIL)).toBeInTheDocument();

        const emailLink = screen.getByRole("link", {
          name: contacts.EMAIL,
        });
        expect(emailLink).toHaveAttribute("href", `mailto:${contacts.EMAIL}`);

        const telLink = screen.getByRole("link", {
          name: contacts.TEL,
        });
        expect(telLink).toHaveAttribute("href", `tel:${contacts.TEL}`);
      });
    });
  }
});

const formatAddress = (adress: string) => {
  return adress.split(",").join(" ");
};
