import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductSection from "@/app/[locale]/home/(products)/ProductSection";
import locales from "@/test/util/language/locales";
import ProductGrid from "../../../app/[locale]/home/(products)/ProductGrid";
import { dummyProducts } from "@/app/[locale]/home/(products)/dummyProducts";
import { IntlProvider } from "next-intl";

describe("Products section tests", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  jest.mock("../../../util/fetchData", () => ({
    fetchData: jest.fn().mockResolvedValue(dummyProducts),
  }));

  it("renders hero content", () => {
    for (const [locale, { messages }] of Object.entries(locales)) {
      render(<ProductSection />, {
        wrapper: ({ children }) => (
          <IntlProvider locale={locale} messages={messages}>
            {children}
          </IntlProvider>
        ),
      });

      const localizedTitle = screen.getByText(messages.Index.products.title);
      expect(localizedTitle).toBeInTheDocument();
    }
  });

  it("fails if the language in heroContent title is incorrect", () => {
    expect(() => {
      render(<ProductSection />, {
        wrapper: ({ children }) => (
          <IntlProvider
            locale={locales.en.messages.Locale}
            messages={locales.en.messages}
          >
            {children}
          </IntlProvider>
        ),
      });

      const heroContent = screen.getByRole("heading", { level: 2 });
      expect(heroContent).toHaveTextContent(
        locales.de.messages.Index.products.title
      );
    }).toThrow();
  });

  it("renders the 8 most loved products", async () => {
    render(<ProductSection />, {
      wrapper: ({ children }) => (
        <IntlProvider
          locale={locales.en.messages.Locale}
          messages={locales.en.messages}
        >
          {children}
        </IntlProvider>
      ),
    });

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(8);
  });
});

describe("Product grid tests", () => {
  it.skip("should show image titles on hover", async () => {
    render(<ProductGrid />, {
      wrapper: ({ children }) => (
        <IntlProvider
          locale={locales.en.messages.Locale}
          messages={locales.en.messages}
        >
          {children}
        </IntlProvider>
      ),
    });

    const productCards = await screen.findAllByRole("link");

    for (const card of productCards) {
      const image = card.querySelector("img");
      const imageTitle = card.querySelector("h3");

      expect(image).toBeInTheDocument();
      expect(imageTitle).toBeInTheDocument();

      // Check initial visibility
      await waitFor(() => {
        expect(imageTitle).not.toBeVisible();
      });

      fireEvent.mouseOver(card);

      await waitFor(() => {
        expect(imageTitle).toBeVisible();
      });
    }
  });

  it.skip("redirects to product page based on productId", async () => {
    render(<ProductGrid />, {
      wrapper: ({ children }) => (
        <IntlProvider
          locale={locales.en.messages.Locale}
          messages={locales.en.messages}
        >
          {children}
        </IntlProvider>
      ),
    });

    const productCards = await screen.findAllByRole("link");

    for (const card of productCards) {
      const image = card.querySelector("img");
      const imageTitle = card.querySelector("h3")?.textContent;
      const productId = dummyProducts.find(
        (product) => product.title === imageTitle
      )?.id;

      if (image) {
        fireEvent.click(image);
        await waitFor(() => {
          expect(card).toHaveAttribute("href", `/product/${productId}`);
        });
      }
    }
  });
});
