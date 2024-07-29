import "@testing-library/jest-dom";
import locales from "../util/language/locales";
import { screen } from "@testing-library/react";
import { setup } from "@/test/util/mocks/mockRender";

import AboutPage from "../../app/[locale]/about/page";

describe("AboutPage tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale} `, () => {
      it("renders all sections and footer correctly", () => {
        setup({
          Component: <AboutPage />,
          messages: messages,
          locale: locale,
        });

        expect(
          screen.getByText(messages.About.about.label)
        ).toBeInTheDocument();
        expect(
          screen.getByText(messages.About.history.label)
        ).toBeInTheDocument();
        expect(
          screen.getByText(messages.About.sustainability.label)
        ).toBeInTheDocument();
        expect(screen.getByText(messages.About.team.label)).toBeInTheDocument();
      });
    });
  }
});
