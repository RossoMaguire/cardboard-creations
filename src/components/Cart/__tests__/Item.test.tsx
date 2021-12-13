import { mockItems, mockProduct } from "../../common/mock_data";
import { render, screen } from "@testing-library/react";

import Item from "../Item";

const setTotalAmount = jest.fn();

describe("Item functions produce correct data", () => {
  it("calculates & shows correct quantity on render", async () => {
    render(
      <Item
        product={mockProduct}
        items={mockItems}
        setTotalAmount={setTotalAmount}
      />
    );

    const quantity = await screen.getByTestId("quantity");
    expect(quantity).toHaveTextContent("2");
  });

  it("calculates & shows correct price on render", async () => {
    render(
      <Item
        product={mockProduct}
        items={mockItems}
        setTotalAmount={setTotalAmount}
      />
    );

    const price = await screen.getByTestId("price");
    expect(price).toHaveTextContent("389.98");
  });
});
