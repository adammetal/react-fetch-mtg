import useImagePreload from "../../../Hooks/useImagePreload";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CardList from "../CardList";

jest.mock("../../../Hooks/useImagePreload");

const testCards = [
  { object: "card", id: 1, image_uris: { png: "http://test/1.png" }, cmc: 3 },
  { object: "card", id: 2, image_uris: { png: "http://test/2.png" }, cmc: 2 },
  { object: "card", id: 3, image_uris: { png: "http://test/3.png" }, cmc: 1 },
];

describe("CardList component", () => {
  beforeAll(() => {
    useImagePreload.mockReturnValue(false);
  });

  afterAll(() => {
    jest.resetAllMocks();
  })

  test("should order cards when user clicks the order button", async () => {
    render(<CardList loading={false} cards={testCards} />);

    const button = screen.getByText("Sort by cost");
    fireEvent.click(button);

    await waitFor(() => {
      const imgs = screen.getAllByRole("img");
      const cards = imgs.map((img) => img.src);
      return expect(cards).toStrictEqual([
        "http://test/3.png",
        "http://test/2.png",
        "http://test/1.png",
      ]);
    });
  });
});
