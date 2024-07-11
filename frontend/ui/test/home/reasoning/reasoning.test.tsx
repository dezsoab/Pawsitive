import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import Reasoning from "@/app/[locale]/home/(reasoning)/Reasoning";
import { setup } from "@/test/util/mocks/mockRender";

describe("Reasoning tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale} `, () => {
      it("renders the reasonings correctly in all languages", () => {
        setup({
          Component: <Reasoning />,
          messages: messages,
          locale: locale,
        });
        const reasoningText = screen.getByRole("heading", { level: 6 });
        expect(reasoningText).toBeInTheDocument();
      });

      it("renders reasonings with correct content", () => {
        setup({
          Component: <Reasoning />,
          messages: messages,
          locale: locale,
        });
        const reasoningText = screen.getByRole("heading", { level: 6 });
        expect(reasoningText).toHaveTextContent(messages.Index.reasoning.title);
      });
    });
  }

  it("fails if the language in reasoning is incorrect", () => {
    // assert that the function throws an error
    // because instead of english reasoning, the german is rendered
    expect(() => {
      setup({
        Component: <Reasoning />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const reasoningText = screen.getByRole("heading", { level: 6 });
      expect(reasoningText).toHaveTextContent(
        locales.de.messages.Index.reasoning.title
      );
    }).toThrow();
  });
});
