import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import { setup } from "../../util/mocks/mockRender";
import Footer from "@/app/[locale]/home/(footer)/Footer";
import { navigationRoutes } from "@/enums/navigationRoutes";

describe("Footer Section tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders the Footer Section correctly in all languages", () => {
        setup({
          Component: <Footer />,
          messages: messages,
          locale: locale,
        });
        const footerDescription = screen.getByText(
          messages.Index.footer.paragraph
        );
        expect(footerDescription).toBeInTheDocument();
      });
    });
  }

  it("renders navigation links with correct href attributes", () => {
    setup({
      Component: <Footer />,
      messages: locales.en.messages,
      locale: "en",
    });

    const aboutLink = screen.getByRole("link", {
      name: locales.en.messages.Navigation.about,
    });
    expect(aboutLink).toHaveAttribute("href", navigationRoutes.ABOUT);

    const contactLink = screen.getByRole("link", {
      name: locales.en.messages.Navigation.contact,
    });
    expect(contactLink).toHaveAttribute("href", navigationRoutes.CONTACT);

    const privacyLink = screen.getByRole("link", {
      name: locales.en.messages.Navigation.privacy,
    });
    expect(privacyLink).toHaveAttribute("href", navigationRoutes.PRIVACY);

    const termsLink = screen.getByRole("link", {
      name: locales.en.messages.Navigation.terms,
    });
    expect(termsLink).toHaveAttribute("href", navigationRoutes.TERMS);

    const faqsLink = screen.getByRole("link", {
      name: locales.en.messages.Navigation.faqs,
    });
    expect(faqsLink).toHaveAttribute("href", navigationRoutes.FAQs);
  });

  it("renders social media icons with correct href attributes", () => {
    setup({
      Component: <Footer />,
      messages: locales.en.messages,
      locale: "en",
    });

    const instaLink = screen.getByRole("link", { name: /Instagram/i });
    expect(instaLink).toHaveAttribute("href", navigationRoutes.INSTA);

    const facebookLink = screen.getByRole("link", { name: /Facebook/i });
    expect(facebookLink).toHaveAttribute("href", navigationRoutes.FACEBOOK);
  });
});
