import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "../../../components/navigation/Navbar";
import locales from "../../util/language/locales";
import { setup } from "../../util/mocks/mockRender";

describe("Navigation tests", () => {
  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders the navigation correctly in all languages", () => {
        setup({
          Component: <Navigation />,
          messages: messages,
          locale: locale,
        });
        const navBar = screen.getByRole("navigation");
        expect(navBar).toBeInTheDocument();
      });

      it("Navigation has correct links", () => {
        setup({
          Component: <Navigation />,
          messages: messages,
          locale: locale,
        });
        const navBar = screen.getByRole("navigation");
        expect(navBar).toBeInTheDocument();
        expect(navBar).toHaveTextContent(messages.Navigation.home);
        expect(navBar).toHaveTextContent(messages.Navigation.about);
        expect(navBar).toHaveTextContent(messages.Navigation.contact);
        expect(navBar).toHaveTextContent(messages.Navigation.shop);
      });
    });

    it("navigates the user to /shop", () => {
      const { push } = setup({
        Component: <Navigation />,
        messages: messages,
        locale: locale,
      });
      const shopBtn = screen.getByText(messages.Navigation.shop);

      fireEvent.click(shopBtn);
      expect(push).toHaveBeenCalledWith("/shop", { scroll: true });
    });

    it("navigates the user to /about", () => {
      const { push } = setup({
        Component: <Navigation />,
        messages: messages,
        locale: locale,
      });
      const aboutBtn = screen.getByText(messages.Navigation.about);

      fireEvent.click(aboutBtn);
      expect(push).toHaveBeenCalledWith("/about", { scroll: true });
    });

    it("navigates the user to /contact", () => {
      const { push } = setup({
        Component: <Navigation />,
        messages: messages,
        locale: locale,
      });
      const contactBtn = screen.getByText(messages.Navigation.contact);

      fireEvent.click(contactBtn);
      expect(push).toHaveBeenCalledWith("/contact", { scroll: true });
    });

    it("navigates the user to /home", () => {
      const { push } = setup({
        Component: <Navigation />,
        messages: messages,
        locale: locale,
      });
      const homeBtn = screen.getByText(messages.Navigation.home);

      fireEvent.click(homeBtn);
      expect(push).toHaveBeenCalledWith("/home", { scroll: true });
    });
  }

  it("fails if the language in navbar is incorrect", () => {
    // assert that the function throws an error
    // because instead of english 'about', the german 'ueber uns' is rendered

    expect(() => {
      setup({
        Component: <Navigation />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });
      const navBar = screen.getByRole("navigation");
      expect(navBar).toHaveTextContent(locales.de.messages.Navigation.about);
    }).toThrow();
  });
});
