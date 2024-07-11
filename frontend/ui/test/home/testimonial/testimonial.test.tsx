import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderWithIntl from "../../util/language/render-with-intl";
import locales from "../../util/language/locales";
import Testimonial from "@/app/[locale]/home/(testimonial)/Testimonial";

describe("Testimonial tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders the testimonial correctly in all languages", () => {
        renderWithIntl(<Testimonial />, locale, messages);
        const testimonialText = screen.getByRole("heading", { level: 3 });
        expect(testimonialText).toBeInTheDocument();
      });

      it("renders testimonial with correct content", () => {
        renderWithIntl(<Testimonial />, locale, messages);
        const testimonialText = screen.getByRole("heading", { level: 3 });
        expect(testimonialText).toBeInTheDocument();
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
      renderWithIntl(
        <Testimonial />,
        locales.en.messages.Locale,
        locales.en.messages
      );
      const testimonialText = screen.getByRole("heading", { level: 3 });
      expect(testimonialText).toHaveTextContent(
        locales.de.messages.Index.testimonial.title
      );
    }).toThrow();
  });

  it("renders correct amount (5) of star reviews", () => {
    renderWithIntl(
      <Testimonial />,
      locales.en.messages.Locale,
      locales.en.messages
    );

    const stars = screen.getAllByTestId("star-icon");
    expect(stars).toHaveLength(5);
  });
});
