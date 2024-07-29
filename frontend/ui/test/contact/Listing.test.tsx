import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Listing from "../../app/[locale]/contact/(contact)/Listing";

import { setImmediate } from "timers";
global.setImmediate = setImmediate;

describe("Listing tests", () => {
  const propsWithHref = {
    href: "https://pawsitivecollar.com",
    icon: "📍",
    text: "Visit us",
    label: "Address",
  };

  const propsWithoutHref = {
    icon: "📍",
    text: "123,Graz",
    label: "Address",
  };

  it("renders listing with link correctly", () => {
    render(<Listing {...propsWithHref} />);

    expect(
      screen.getByText(`${propsWithHref.icon} ${propsWithHref.label}`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: propsWithHref.text })
    ).toHaveAttribute("href", propsWithHref.href);
  });

  it("renders listing without link correctly", () => {
    render(<Listing {...propsWithoutHref} />);

    expect(
      screen.getByText(`${propsWithoutHref.icon} ${propsWithoutHref.label}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(propsWithoutHref.text.replace(",", " "))
    ).toBeInTheDocument();
  });
});
