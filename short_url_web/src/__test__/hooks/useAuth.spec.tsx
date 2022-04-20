import { renderHook } from "@testing-library/react-hooks";
import { useAuth } from "../../hooks/useAuth";

import { AuthContextProvider } from "../../contexts/AuthContext";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

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

describe("useAuth", () => {
  it("should return content of type AuthContext", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current).toEqual(
      expect.objectContaining({
        authenticated: false,
        user: null,
      })
    );
  });
});
