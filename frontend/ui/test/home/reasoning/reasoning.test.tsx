import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import Reasoning from "@/app/[locale]/home/(reasoning)/Reasoning";
import { setup } from "@/test/util/mocks/mockRender";
import { act } from "react";
import Reason from "@/app/[locale]/home/(reasoning)/Reason";

describe("Reasoning tests", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "requestAnimationFrame")
      .mockImplementation((cb) => setTimeout(cb, 0));
    jest.useFakeTimers();
  });

  it("renders with initial amount", () => {
    setup({
      Component: <Reason amount="1000" description="initial amount" />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const amount = screen.getByText("0");
    expect(amount).toHaveTextContent("0");
  });

  it("does not animate count when not in view", () => {
    setup({
      Component: <Reason amount="1000" description="does not animate" />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const amount = screen.getAllByText("0");

    Object.defineProperty(amount, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        top: window.innerHeight + 100,
        bottom: window.innerHeight + 150,
        left: 0,
        right: window.innerWidth,
        height: 50,
        width: window.innerWidth,
      }),
    });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("0")).toBeInTheDocument();
  });

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
