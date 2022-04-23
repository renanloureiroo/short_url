import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { AuthContextProvider } from "../../contexts/AuthContext";
import { useAuth } from "../../hooks/useAuth";

import AxiosMocked from "axios-mock-adapter";
import { api } from "../../services/api";
import { AppError } from "../../Error/AppError";

const ApiMocked = new AxiosMocked(api);

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <MemoryRouter>
      <AuthContextProvider>{children}</AuthContextProvider>
    </MemoryRouter>
  );
};
jest.spyOn(window.localStorage.__proto__, "setItem");

window.localStorage.__proto__.setItem = jest.fn();

describe("AuthContext", () => {
  describe("SignIn Function", () => {
    it("sign success", async () => {
      ApiMocked.onPost("/account/signin").reply(200, {
        token: "token",
        user: {
          id: "id",
          name: "name",
          email: "email",
        },
      });

      const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
      const signIn = result.current.signIn;
      await waitFor(() => signIn("fakeemail@email.com", "fakepassword"));
      const token = api.defaults.headers.common["Authorization"];

      expect(token).toEqual("Bearer token");
      expect(result.current.authenticated).toBeTruthy();
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "@shortUrl:token",
        '"token"'
      );
    });

    it("signIn error email or password incorrect", async () => {
      ApiMocked.onPost("/account/signin").reply(400, {
        error: "Email or password incorrect!",
      });

      const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
      const signIn = result.current.signIn;

      try {
        await waitFor(() => signIn("fakeemail@email.com", "fakepassword"));
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
      }
    });

    it("signIn server error", async () => {
      ApiMocked.onPost("/account/signin").reply(500, {
        error: "Internal server error",
      });

      const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
      const signIn = result.current.signIn;

      try {
        await waitFor(() => signIn("fakeemail@email.com", "fakepassword"));
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
      }
    });
  });
});
