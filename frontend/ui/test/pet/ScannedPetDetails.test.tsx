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
      `${locales.en.messages.ScannedPet.breed}: ${petMock.breed}`
    );
    const ageText = screen.getByText(
      `${locales.en.messages.ScannedPet.age}: ${petMock.age}`
    );

    expect(breedText).toBeInTheDocument();
    expect(ageText).toBeInTheDocument();
  });

  it("renders owner details correctly", () => {
    setup({
      Component: <ScannedPetDetails pet={petMock} />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    const addressText = screen.getByText(
      `${locales.en.messages.ScannedPet.address}: ${petMock.owner.address.city}`
    );
    const phoneText = screen.getByText(
      `${locales.en.messages.ScannedPet.tel}: ${petMock.owner.phone}`
    );
    const emailText = screen.getByText(
      `${locales.en.messages.ScannedPet.email}: ${petMock.owner.email}`
    );

    expect(addressText).toBeInTheDocument();
    expect(phoneText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
  });

  it("renders correctly in all locales", () => {
    for (const [locale, { messages }] of Object.entries(locales)) {
      setup({
        Component: <ScannedPetDetails pet={petMock} />,
        messages,
        locale,
      });

      const breedText = screen.getByText(
        `${messages.ScannedPet.breed}: ${petMock.breed}`
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

      const breedText = screen.getByText(locales.de.messages.ScannedPet.breed);
      expect(breedText).toBeInTheDocument();
    }).toThrow();
  });
});
