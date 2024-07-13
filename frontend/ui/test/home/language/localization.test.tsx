import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import HeroContent from "@/app/[locale]/home/(hero)/HeroContent";
import { screen } from "@testing-library/react";
import { setup } from "@/test/util/mocks/mockRender";

describe("Localization tests", () => {
  it("renders hero content", () => {
    for (const [locale, { messages }] of Object.entries(locales)) {
      setup({
        Component: <HeroContent />,
        messages: messages,
        locale: locale,
      });

      const localizedContent = screen.getByText(messages.Index.hero.title);
      expect(localizedContent).toBeInTheDocument();
    }
  });

  it("fails if the language in heroContent title is incorrect", () => {
    // assert that the function throws an error
    // because instead of english title, the german is rendered
    expect(() => {
      setup({
        Component: <HeroContent />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const heroContent = screen.getByRole("heading", { level: 1 });
      expect(heroContent).toHaveTextContent(
        locales.de.messages.Index.hero.title
      );
    }).toThrow();
  });
});
