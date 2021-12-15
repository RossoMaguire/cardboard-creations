import { mockItems, mockProduct } from "../../common/mock_data";
import { render, screen } from "@testing-library/react";

import Item from "../Item";

describe("Item functions produce correct data", () => {
  it("calculates & shows correct price on render", async () => {
    render(<Item product={mockProduct} items={mockItems} />);

    const price = await screen.getByTestId("price");
    expect(price).toHaveTextContent("389.98");
  });
});
