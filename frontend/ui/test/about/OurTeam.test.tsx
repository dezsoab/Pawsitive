import "@testing-library/jest-dom";
import locales from "../util/language/locales";
import { screen } from "@testing-library/react";
import { setup } from "@/test/util/mocks/mockRender";
import OurTeam from "../../app/[locale]/about/(ourTeam)/OurTeam";

const ourTeamProps = {
  label: "Test Team Label",
  header: "Test Team Header",
  paragraph: "Test Team Paragraph",
};

describe("OurTeam tests", () => {
  it("renders OurTeam with given props and person tags", () => {
    setup({
      Component: <OurTeam {...ourTeamProps} />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    expect(screen.getByText(ourTeamProps.label)).toBeInTheDocument();
    expect(screen.getByText(ourTeamProps.header)).toBeInTheDocument();
    expect(screen.getByText(ourTeamProps.paragraph)).toBeInTheDocument();
  });
});
