import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { AuthContextProvider } from "../../contexts/AuthContext";

import { useAuth } from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth");

const navigateMocked = jest.fn();
const signOutMocked = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => navigateMocked,
}));

describe("Header component", () => {
  it("should render correctly when unauthenticated", () => {
    const useAuthMocked = mocked(useAuth);

    useAuthMocked.mockReturnValue({
      authenticated: false,
      signOut: jest.fn(),
      user: null,
    } as any);

    render(
      <MemoryRouter>
        <AuthContextProvider>
          <ChakraProvider>
            <Header />
          </ChakraProvider>
        </AuthContextProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(
      screen.queryByRole("link", { name: /meus links/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i }));
  });

  it("should call a function on button click when unauthenticated", () => {
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <ChakraProvider>
            <Header />
          </ChakraProvider>
        </AuthContextProvider>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.click(button);

    expect(navigateMocked).toHaveBeenCalled();
  });

  it("should render correctly when authenticated", () => {
    const useAuthMocked = mocked(useAuth);

    useAuthMocked.mockReturnValue({
      authenticated: true,
      signOut: signOutMocked,
      user: {
        name: "John Doe",
      },
    } as any);

    render(
      <MemoryRouter>
        <AuthContextProvider>
          <ChakraProvider>
            <Header />
          </ChakraProvider>
        </AuthContextProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /sair/i }));
    expect(screen.getByTestId("avatar")).toHaveTextContent("JD");
  });

  it("should call a function on button click when authenticated", () => {
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <ChakraProvider>
            <Header />
          </ChakraProvider>
        </AuthContextProvider>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /sair/i });

    fireEvent.click(button);

    expect(signOutMocked).toHaveBeenCalled();
  });
});
