import { render, screen } from "@testing-library/react";

import ProductDetail from "../ProductDetail";
import { mockProduct } from "../../common/mock_data";

describe("Rendering the Product", () => {
  it("renders the product details correcty", async () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("Home Bar - Cardboard Bar")).toBeInTheDocument();
    expect(screen.queryByText("Our Best Seller")).not.toBeInTheDocument();
  });

  it("Renders the product as Best Seller", async () => {
    render(<ProductDetail product={mockProduct} isBestSeller />);

    expect(screen.getByText("Our Best Seller")).toBeInTheDocument();
  });
});
