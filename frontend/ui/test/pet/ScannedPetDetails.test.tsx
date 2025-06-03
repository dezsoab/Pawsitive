import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { setup } from "@/test/util/mocks/mockRender";
import locales from "../util/language/locales";
import { petMock } from "../util/mocks/petMock";
import ScannedPetDetails from "@/app/[locale]/pet/ScannedPetDetails";

describe("ScannedPetDetails Component Tests", () => {
  it("renders pet details correctly", () => {
    setup({
      Component: <ScannedPetDetails pet={petMock} />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const breedText = screen.getByText(
      `${locales.en.messages.Pet.breed}: ${petMock.breed}`
    );
    const ageText = screen.getByText(
      `${locales.en.messages.Pet.age}: ${petMock.age}`
    );

    expect(breedText).toBeInTheDocument();
    expect(ageText).toBeInTheDocument();
  });

  it("renders correctly in all locales", () => {
    for (const [locale, { messages }] of Object.entries(locales)) {
      setup({
        Component: <ScannedPetDetails pet={petMock} />,
        messages,
        locale,
      });

      const breedText = screen.getByText(
        `${messages.Pet.breed}: ${petMock.breed}`
      );
      expect(breedText).toBeInTheDocument();
    }
  });

  it("fails if the wrong language is rendered", () => {
    expect(() => {
      setup({
        Component: <ScannedPetDetails pet={petMock} />,
        messages: locales.en.messages,
        locale: locales.en.messages.Locale,
      });

      const breedText = screen.getByText(locales.de.messages.Pet.breed);
      expect(breedText).toBeInTheDocument();
    }).toThrow();
  });
});
