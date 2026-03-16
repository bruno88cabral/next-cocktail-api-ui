import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders provider text and external link", () => {
    render(<Footer />);

    expect(screen.getByText(/Powered by/i)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /TheCocktailDB/i });
    expect(link).toHaveAttribute("href", "https://www.thecocktaildb.com/");
    expect(link).toHaveAttribute("target", "_blank");
  });
});