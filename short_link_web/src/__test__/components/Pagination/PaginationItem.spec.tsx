import { fireEvent, render, screen } from "@testing-library/react";
import { PaginationItem } from "../../../components/Pagination/PaginationItem";

const onPageChangeMocked = jest.fn();

describe("PaginationItem component", () => {
  it("should render correctly not current page", () => {
    render(<PaginationItem number={1} onPageChange={onPageChangeMocked} />);

    expect(screen.getByRole("button")).toHaveTextContent("1");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should render correctly current page", () => {
    render(
      <PaginationItem isCurrent number={1} onPageChange={onPageChangeMocked} />
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should called function with click", () => {
    render(<PaginationItem number={1} onPageChange={onPageChangeMocked} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onPageChangeMocked).toBeCalled();
  });
});
