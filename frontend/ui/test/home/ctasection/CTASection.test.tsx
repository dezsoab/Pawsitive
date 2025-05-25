import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import CTASection from "@/app/[locale]/home/(CTASection)/CTASection";

import { setup } from "../../util/mocks/mockRender";
import { navigationRoutes } from "@/enums/navigationRoutes";

describe("CTA Section tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders the CTA Section correctly in all languages", () => {
        setup({
          Component: <CTASection />,
          messages: messages,
          locale: locale,
        });
        const ctaSectionTitle = screen.getByRole("heading", { level: 4 });
        expect(ctaSectionTitle).toBeInTheDocument();
      });

      it("renders CTA Section with correct content", () => {
        setup({
          Component: <CTASection />,
          messages: messages,
          locale: locale,
        });
        const ctaSectionTitle = screen.getByRole("heading", { level: 4 });
        expect(ctaSectionTitle).toHaveTextContent(
          messages.Index.ctasection.title
        );
      });
    });

    it("renders a link to the external shop with correct attributes", async () => {
      setup({
        Component: <CTASection />,
        messages: messages,
        locale: locale,
      });

      const shopBtn = screen.getByText(messages.Navigation.shop);
      const link = shopBtn.closest("a");

      expect(link).toHaveAttribute("href", navigationRoutes.SHOP);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("navigates the user to /about", () => {
      const { push } = setup({
        Component: <CTASection />,
        messages: messages,
        locale: locale,
      });
      const aboutBtn = screen.getByText(messages.Navigation.about);

      fireEvent.click(aboutBtn);
      expect(push).toHaveBeenCalledWith("/about", { scroll: true });
    });
  }

  it("fails if the language in CTA Section is incorrect", () => {
    // assert that the function throws an error
    // because instead of english testimonial, the german is rendered
    expect(() => {
      setup({
        Component: <CTASection />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });
      const ctaSectionTitle = screen.getByRole("heading", { level: 4 });
      expect(ctaSectionTitle).toHaveTextContent(
        locales.de.messages.Index.ctasection.title
      );
    }).toThrow();
  });
});
