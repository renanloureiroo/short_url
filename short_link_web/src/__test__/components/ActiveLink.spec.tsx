import { render, screen } from "@testing-library/react";
import { ActiveLink } from "../../components/ActiveLink";
import { MemoryRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

describe("ActiveLink component", () => {
  it("should renders correctly when match route", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <ChakraProvider>
          <ActiveLink to={"/home"}>Home</ActiveLink>
        </ChakraProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveAttribute("href", "/home");
  });

  it("should renders correctly when not match route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ActiveLink to={"/home"}>Home</ActiveLink>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveAttribute("href", "/home");
  });
});
