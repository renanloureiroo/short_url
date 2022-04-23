import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { Input } from "../../../components/Form/Input";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

describe("Input component", () => {
  it("renders correctly", () => {
    const { debug } = render(<Input placeholder="Input test" type="email" />, {
      wrapper: Wrapper,
    });

    expect(screen.getByPlaceholderText("Input test")).toHaveAttribute(
      "type",
      "email"
    );
  });

  it("renders correctly", () => {
    const error = {
      message: "Fake message error",
    } as FieldError;

    const { debug } = render(
      <Input error={error} placeholder="Input test" type="email" />,
      {
        wrapper: Wrapper,
      }
    );

    expect(screen.getByPlaceholderText("Input test")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "Fake message error"
    );
  });
});
