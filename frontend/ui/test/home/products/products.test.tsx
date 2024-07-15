import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ProductSection from "@/app/[locale]/home/(products)/ProductSection";
import locales from "@/test/util/language/locales";
import { dummyProducts } from "@/app/[locale]/home/(products)/dummyProducts";
import ProductGrid from "../../../app/[locale]/home/(products)/ProductGrid";
import { setup } from "@/test/util/mocks/mockRender";

describe("Products section tests", () => {
  it("renders hero content", () => {
    for (const [locale, { messages }] of Object.entries(locales)) {
      setup({
        Component: <ProductSection />,
        messages: messages,
        locale: locale,
      });

      const localizedTitle = screen.getByText(messages.Index.products.title);
      expect(localizedTitle).toBeInTheDocument();
    }
  });

  it("fails if the language in heroContent title is incorrect", () => {
    // assert that the function throws an error
    // because instead of english title, the german is rendered
    expect(() => {
      setup({
        Component: <ProductSection />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const heroContent = screen.getByRole("heading", { level: 2 });
      expect(heroContent).toHaveTextContent(
        locales.de.messages.Index.products.title
      );
    }).toThrow();
  });

  it("renders the 8 most loved products", () => {
    expect(() => {
      setup({
        Component: <ProductSection />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(8);
    });
  });
});

describe("Product grid tests", () => {
  it("should show image titles on hover", () => {
    setup({
      Component: <ProductGrid />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

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
    setup({
      Component: <ProductGrid />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

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
