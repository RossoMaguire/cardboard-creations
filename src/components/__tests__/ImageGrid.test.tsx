import { render, screen } from "@testing-library/react";

import ImageGrid from "../ImageGrid";
import homeGridImages from "../../repositories/image-grid";

describe("Rendering the ImageGrid", () => {
  it("renders thecorrect number of images", async () => {
    render(<ImageGrid images={homeGridImages} />);

    expect(screen.getAllByTestId("image-grid-item")).toHaveLength(5);
  });
});
