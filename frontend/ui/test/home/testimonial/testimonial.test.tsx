import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import Testimonial from "@/app/[locale]/home/(testimonial)/Testimonial";
import { setup } from "@/test/util/mocks/mockRender";

describe("Testimonial tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders the testimonial correctly in all languages", () => {
        setup({
          Component: <Testimonial />,
          messages: messages,
          locale: locale,
        });
        const testimonialText = screen.getByRole("heading", { level: 3 });
        expect(testimonialText).toBeInTheDocument();
      });

      it("renders testimonial with correct content", () => {
        setup({
          Component: <Testimonial />,
          messages: messages,
          locale: locale,
        });
        const testimonialText = screen.getByRole("heading", { level: 3 });
        expect(testimonialText).toHaveTextContent(
          messages.Index.testimonial.title
        );
      });
    });
  }

  it("fails if the language in testimonial is incorrect", () => {
    // assert that the function throws an error
    // because instead of english testimonial, the german is rendered
    expect(() => {
      setup({
        Component: <Testimonial />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });
      const testimonialText = screen.getByRole("heading", { level: 3 });
      expect(testimonialText).toHaveTextContent(
        locales.de.messages.Index.testimonial.title
      );
    }).toThrow();
  });

  it("renders correct amount (5) of star reviews", () => {
    setup({
      Component: <Testimonial />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const stars = screen.getAllByTestId("star-icon");
    expect(stars).toHaveLength(5);
  });
});
