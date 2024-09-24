import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { setup } from "@/test/util/mocks/mockRender";
import locales from "../../util/language/locales";

import Features from "../../../app/[locale]/home/(features)/Features";
import FeatureBlock from "../../../app/[locale]/home/(features)/FeatureBlock";

import molli1 from "@/public/assets/molli1.webp";

describe("Features and FeatureBlock tests", () => {
  const mockImage = {
    src: molli1,
    height: 300,
    width: 300,
  };

  describe("Features Component", () => {
    it("renders with the correct background color and flex direction", () => {
      setup({
        Component: (
          <Features
            bgc="var(--color-white)"
            flexDir="row"
            imgPath={mockImage.src}
            isServices={false}
          />
        ),
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const section = screen.getByTestId("features");
      expect(section).toHaveStyle({ backgroundColor: "var(--color-white)" });
    });

    it("renders FeatureBlock with correct flex direction and image", () => {
      setup({
        Component: (
          <Features
            bgc="var(--color-pink-light)"
            flexDir="row-reverse"
            imgPath={mockImage.src}
            isServices={false}
          />
        ),
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const block = screen.getByTestId("block");
      expect(block).toHaveStyle({ flexDirection: "row-reverse" });

      const image = screen.getByTestId("block-image");
      expect(image).toBeInTheDocument();
    });
  });

  describe("FeatureBlock Component", () => {
    it("renders the title and reasons from features", () => {
      setup({
        Component: (
          <FeatureBlock
            flexDir="row"
            imgPath={mockImage.src}
            isServices={false}
          />
        ),
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const title = screen.getByText(locales.en.messages.Index.features.title);
      const reason1 = screen.getByText(
        locales.en.messages.Index.features.reason_1
      );
      const reason2 = screen.getByText(
        locales.en.messages.Index.features.reason_2
      );
      const reason3 = screen.getByText(
        locales.en.messages.Index.features.reason_3
      );

      expect(title).toBeInTheDocument();
      expect(reason1).toBeInTheDocument();
      expect(reason2).toBeInTheDocument();
      expect(reason3).toBeInTheDocument();
    });

    it("renders the title and reasons from services", () => {
      setup({
        Component: (
          <FeatureBlock
            flexDir="column"
            imgPath={mockImage.src}
            isServices={true}
          />
        ),
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const title = screen.getByText(locales.en.messages.Index.services.title);
      const reason1 = screen.getByText(
        locales.en.messages.Index.services.reason_1
      );
      const reason2 = screen.getByText(
        locales.en.messages.Index.services.reason_2
      );
      const reason3 = screen.getByText(
        locales.en.messages.Index.services.reason_3
      );

      expect(title).toBeInTheDocument();
      expect(reason1).toBeInTheDocument();
      expect(reason2).toBeInTheDocument();
      expect(reason3).toBeInTheDocument();
    });

    it("renders in all locales correctly", () => {
      for (const [locale, { messages }] of Object.entries(locales)) {
        setup({
          Component: (
            <FeatureBlock
              flexDir="row"
              imgPath={mockImage.src}
              isServices={false}
            />
          ),
          messages,
          locale,
        });

        const title = screen.getByText(messages.Index.features.title);
        expect(title).toBeInTheDocument();
      }
    });

    it("fails if the wrong language is rendered", () => {
      expect(() => {
        setup({
          Component: (
            <FeatureBlock
              flexDir="row"
              imgPath={mockImage.src}
              isServices={false}
            />
          ),
          messages: locales.en.messages,
          locale: locales.en.messages.Locale,
        });

        const title = screen.getByText(
          locales.de.messages.Index.features.title
        );
        expect(title).toBeInTheDocument();
      }).toThrow();
    });
  });
});
