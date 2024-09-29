import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { setup } from "@/test/util/mocks/mockRender";
import locales from "../util/language/locales";
import { navigationRoutes } from "@/enums/navigationRoutes";
import NotFoundPage from "@/app/[locale]/[...not-found]/page";

describe("NotFoundPage Component Tests", () => {
  it("renders the 404 title", () => {
    setup({
      Component: <NotFoundPage />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const errorCode = screen.getByText("404");
    expect(errorCode).toBeInTheDocument();
  });

  it("renders translated title and secondary title", () => {
    setup({
      Component: <NotFoundPage />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const title = screen.getByText(locales.en.messages.NotFound.title);
    const secondaryTitle = screen.getByText(
      locales.en.messages.NotFound.title_secondary
    );

    expect(title).toBeInTheDocument();
    expect(secondaryTitle).toBeInTheDocument();
  });

  it("renders CTAButton with correct path", () => {
    setup({
      Component: <NotFoundPage />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const ctaButton = screen.getByText(locales.en.messages.Navigation.home);
    expect(ctaButton.closest("a")).toHaveAttribute(
      "href",
      navigationRoutes.HOME
    );
  });

  it("renders Instagram link correctly", () => {
    setup({
      Component: <NotFoundPage />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const instagramLink = screen.getByRole("link", { name: "Instagram" });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute("href", navigationRoutes.INSTA);
    expect(instagramLink).toHaveAttribute("target", "_blank");
  });

  it("renders Molli image with correct alt text", () => {
    setup({
      Component: <NotFoundPage />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const molliImage = screen.getByAltText(
      locales.en.messages.NotFound.molli_image_alt
    );
    expect(molliImage).toBeInTheDocument();
    expect(molliImage).toHaveAttribute("width", "400");
    expect(molliImage).toHaveAttribute("height", "500");
  });

  it("renders correctly in all locales", () => {
    for (const [locale, { messages }] of Object.entries(locales)) {
      setup({
        Component: <NotFoundPage />,
        messages,
        locale,
      });

      const title = screen.getByText(messages.NotFound.title);
      expect(title).toBeInTheDocument();
    }
  });

  it("fails if the wrong language is rendered", () => {
    expect(() => {
      setup({
        Component: <NotFoundPage />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const title = screen.getByText(locales.de.messages.NotFound.title);
      expect(title).toBeInTheDocument();
    }).toThrow();
  });
});
