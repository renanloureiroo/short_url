import { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../components/Button";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const ChakraProviderWrapper = ({ children }: Props) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

describe("Button component", () => {
  it("should renders correctly", () => {
    render(<Button title="Teste" />, { wrapper: ChakraProviderWrapper });

    expect(screen.getByRole("button")).toHaveTextContent("Teste");
  });

  it("should click called function", () => {
    const fnMock = jest.fn();

    const button = render(<Button title="Teste" onClick={fnMock} />, {
      wrapper: ChakraProviderWrapper,
    });

    fireEvent.click(screen.getByRole("button"));

    expect(fnMock).toHaveBeenCalled();
  });
});
