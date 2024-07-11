import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderWithIntl from "../../util/language/render-with-intl";
import Navigation from "../../../components/navigation/Navbar";
import locales from "../../util/language/locales";

describe("Navigation tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders the navigation correctly in all languages", () => {
        renderWithIntl(<Navigation />, locale, messages);
        const navBar = screen.getByRole("navigation");
        expect(navBar).toBeInTheDocument();
      });

      it("Navigation has correct links", () => {
        renderWithIntl(<Navigation />, locale, messages);
        const navBar = screen.getByRole("navigation");
        expect(navBar).toBeInTheDocument();
        expect(navBar).toHaveTextContent(messages.Navigation.home);
        expect(navBar).toHaveTextContent(messages.Navigation.about);
        expect(navBar).toHaveTextContent(messages.Navigation.contact);
        expect(navBar).toHaveTextContent(messages.Navigation.shop);
      });
    });
  }

  it("fails if the language in navbar is incorrect", () => {
    // assert that the function throws an error
    // because instead of english 'about', the german 'ueber uns' is rendered
    expect(() => {
      renderWithIntl(
        <Navigation />,
        locales.en.messages.Locale,
        locales.en.messages
      );
      const navBar = screen.getByRole("navigation");
      expect(navBar).toHaveTextContent(locales.de.messages.Navigation.about);
    }).toThrow();
  });
});
