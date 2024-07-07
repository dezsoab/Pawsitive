import "@testing-library/jest-dom";
import renderWithIntl from "@/test/util/language/render-with-intl";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ProductSection from "@/app/[locale]/home/(products)/ProductSection";
import locales from "@/test/util/language/locales";
import { dummyProducts } from "@/app/[locale]/home/(products)/dummyProducts";
import ProductGrid from "@/app/[locale]/home/(products)/ProductGrid";

describe("Product grid tests", () => {
  it("should show image titles on hover", () => {
    renderWithIntl(
      <ProductGrid />,
      locales.en.messages.Locale,
      locales.en.messages
    );

    const productCards = screen.getAllByRole("link");

    productCards.forEach((card) => {
      const image = card.querySelector("img");
      const imageTitle = card.querySelector("h3");

      expect(image).toBeInTheDocument();
      expect(imageTitle).toBeInTheDocument();

      // wait for initial render and to get hidden ASAP
      waitFor(() => {
        expect(imageTitle).not.toBeVisible();
      });

      fireEvent.mouseOver(card);

      expect(imageTitle).toBeVisible();
    });
  });

  it("redirects to product page based on productId", () => {
    renderWithIntl(
      <ProductGrid />,
      locales.en.messages.Locale,
      locales.en.messages
    );

    const productCards = screen.getAllByRole("link");

    productCards.forEach((card) => {
      const image = card.querySelector("img");
      const imageTitle = card.querySelector("h3")?.textContent;
      const productId = dummyProducts.find(
        (product) => product.title == imageTitle
      )?.id;

      if (image) {
        fireEvent.click(image);
        expect(card).toHaveAttribute("href", `/product/${productId}`);
      }
    });
  });
});
