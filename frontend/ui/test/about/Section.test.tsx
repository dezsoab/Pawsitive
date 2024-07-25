import "@testing-library/jest-dom";
import locales from "../util/language/locales";
import { screen } from "@testing-library/react";
import { setup } from "@/test/util/mocks/mockRender";
import Section from "../../app/[locale]/about/(section)/Section";

const sectionProps = {
  imageSrc: "/assets/collar1.jpeg",
  imageAlt: "some Alt",
  label: "Test Label",
  header: "Test Header",
  paragraph: "Test Paragraph",
};

describe("Section tests", () => {
  it("renders Section with given props", () => {
    setup({
      Component: <Section {...sectionProps} />,
      messages: locales.en.messages,
      locale: locales.en.messages.Locale,
    });

    expect(screen.getByText(sectionProps.label)).toBeInTheDocument();
    expect(screen.getByText(sectionProps.header)).toBeInTheDocument();
    expect(screen.getByText(sectionProps.paragraph)).toBeInTheDocument();
  });
});
