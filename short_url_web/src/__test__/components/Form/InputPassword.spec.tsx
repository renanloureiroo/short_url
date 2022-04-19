import { fireEvent, render, screen } from "@testing-library/react";
import { FieldError } from "react-hook-form";
import { InputPassword } from "../../../components/Form/InputPassword";

describe("InputPassword component", () => {
  it("should render correctly", () => {
    render(<InputPassword placeholder="Senha" />);

    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
  });

  it("should render message error", () => {
    const error = {
      message: "Fake message error",
    } as FieldError;
    render(<InputPassword error={error} placeholder="Senha" />);

    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "Fake message error"
    );
  });

  it("should  visible and invisible", () => {
    render(<InputPassword placeholder="Senha" />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(screen.getByPlaceholderText("Senha")).toHaveAttribute(
      "type",
      "text"
    );
    fireEvent.click(button);

    expect(screen.getByPlaceholderText("Senha")).toHaveAttribute(
      "type",
      "password"
    );
  });
});
