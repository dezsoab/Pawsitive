import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import { mockNextNavigation } from "@/test/util/mocks/next-navigation";
import renderWithIntl from "@/test/util/language/render-with-intl";
import HeroContent from "@/app/[locale]/home/HeroContent";
import { screen } from "@testing-library/react";

describe("Localization tests", () => {
  it("renders hero content", () => {
    for (const [locale, { messages }] of Object.entries(locales)) {
      renderWithIntl(<HeroContent />, locale, messages);
      const localizedContent = screen.getByText(messages.Index.hero.title);
      expect(localizedContent).toBeInTheDocument();
    }
  });

  it("fails if the language in heroContent title is incorrect", () => {
    // assert that the function throws an error
    // because instead of english title, the german is rendered
    expect(() => {
      renderWithIntl(
        <HeroContent />,
        locales.en.messages.Locale,
        locales.en.messages
      );
      const heroContent = screen.getByRole("heading", { level: 1 });
      expect(heroContent).toHaveTextContent(
        locales.de.messages.Index.hero.title
      );
    }).toThrow();
  });
});
