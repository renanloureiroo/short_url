import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { SignInForm } from "../../components/SigInForm";
import { ReactNode } from "react";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import { mocked } from "jest-mock";

interface WrapperProps {
  children: ReactNode;
}

jest.mock("../../hooks/useAuth");

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <MemoryRouter>
      <ChakraProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ChakraProvider>
    </MemoryRouter>
  );
};
const sigInMockSuccess = jest.fn().mockReturnValue(Promise.resolve());
const sigInMockFail = jest
  .fn()
  .mockImplementation(() => Promise.reject(new Error("Falha ao fazer login!")));

describe("SignInForm component", () => {
  it("should render correctly", () => {
    mocked(useAuth).mockReturnValue({
      signIn: sigInMockSuccess,
    } as any);

    render(<SignInForm></SignInForm>, {
      wrapper: Wrapper,
    });

    expect(
      screen.getByRole("textbox", { name: /e\-mail/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("should render error message when email is invalid and missing password", async () => {
    render(<SignInForm></SignInForm>, {
      wrapper: Wrapper,
    });

    const button = screen.getByRole("button", { name: /entrar/i });

    await waitFor(() => {
      fireEvent.change(screen.getByRole("textbox", { name: /e\-mail/i }), {
        target: {
          value: "renangmail.com",
        },
      });
    });

    await waitFor(() => fireEvent.submit(button));

    expect(screen.getByText("E-mail inválido!")).toBeInTheDocument();
    expect(screen.getByText("Senha é obrigatória!")).toBeInTheDocument();
  });

  describe("Submit form", () => {
    it("should submit success", async () => {
      render(<SignInForm></SignInForm>, {
        wrapper: Wrapper,
      });
      const button = screen.getByRole("button", { name: /entrar/i });

      await waitFor(() => {
        fireEvent.change(screen.getByRole("textbox", { name: /e\-mail/i }), {
          target: {
            value: "fakeemail@gmail.com",
          },
        });
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: {
          value: "fakepassword",
        },
      });

      await waitFor(() => fireEvent.submit(button));

      expect(sigInMockSuccess).toHaveBeenCalled();
      expect(sigInMockSuccess).toHaveBeenCalledWith(
        "fakeemail@gmail.com",
        "fakepassword"
      );
    });
  });

  it("should submit fail", async () => {
    mocked(useAuth).mockReturnValue({
      signIn: sigInMockFail,
    } as any);

    render(<SignInForm></SignInForm>, {
      wrapper: Wrapper,
    });

    const button = screen.getByRole("button", { name: /entrar/i });

    await waitFor(() => {
      fireEvent.change(screen.getByRole("textbox", { name: /e\-mail/i }), {
        target: {
          value: "fakeemail@gmail.com",
        },
      });
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: {
        value: "fakepassword",
      },
    });

    await waitFor(() => fireEvent.submit(button));

    expect(sigInMockFail).toHaveBeenCalled();
    expect(sigInMockFail).toHaveBeenCalledWith(
      "fakeemail@gmail.com",
      "fakepassword"
    );
    expect(
      screen.getByText("Verifique seu e-mail e senha")
    ).toBeInTheDocument();
    expect(screen.getByText("Falha ao fazer login!")).toBeInTheDocument();
  });
});
