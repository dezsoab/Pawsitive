import "@testing-library/jest-dom";
import locales from "../../util/language/locales";
import { mockNextNavigation } from "@/test/util/mocks/next-navigation";

describe("Localization tests", () => {
  beforeAll(() => {
    // Mock Next.js navigation features
    jest.mock("next/navigation", () => mockNextNavigation);
  });

  for (const [locale, { messages }] of Object.entries(locales)) {
    describe(`Locale: ${locale}`, () => {
      it("renders localized content correctly", () => {
        //    localization tests
      });
    });
  }
});
