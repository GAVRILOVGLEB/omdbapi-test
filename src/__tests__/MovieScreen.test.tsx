import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Movies from "../ui/components/Movies/Movies";

test("Test of the 1st successful render", () => {
    render(<Movies />);

    const element = screen.getByText(/No entries for search results.../i);

    expect(element).toBeInTheDocument();
});
