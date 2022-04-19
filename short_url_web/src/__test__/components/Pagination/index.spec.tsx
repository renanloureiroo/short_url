import { render, screen } from "@testing-library/react";
import { Pagination } from "../../../components/Pagination";

const onPageChangeMock = jest.fn();

describe("Pagination Component", () => {
  it("should render correctly when current is first", () => {
    render(
      <Pagination
        totalCount={100}
        itensPerPage={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("should render siblings, first and last pages when current is half", () => {
    render(
      <Pagination
        totalCount={100}
        itensPerPage={10}
        currentPage={5}
        onPageChange={onPageChangeMock}
      />
    );

    expect(screen.getAllByTestId("paginationItem")).toHaveLength(5);
    expect(screen.getAllByText("...")).toHaveLength(2);
  });

  it("should render when current is last", () => {
    render(
      <Pagination
        totalCount={100}
        itensPerPage={10}
        currentPage={10}
        onPageChange={onPageChangeMock}
      />
    );
    const lastPage = screen.getByText("10");

    expect(screen.getAllByTestId("paginationItem")).toHaveLength(3);
    expect(screen.getAllByText("...")).toHaveLength(1);
    expect(lastPage).toBeDisabled();
  });
});
