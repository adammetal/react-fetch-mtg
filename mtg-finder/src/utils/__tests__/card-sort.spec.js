import sortCards from "../card-sort";
/**
 *
 * 1. Get the result somehow sort();
 * 2. Make the expectations
 *    - Make sure data is sorted
 *    - Only works with arrays
 *    - Only works with mtg cards
 *
 */

// Test what checks the sort functions is only works with arrays
test("sort function works only with arrays", () => {
  const data = {};
  const result = sortCards(data);
  expect(result).toBeNull();
});

// Test what checks the sort function works only with mtg cards
test("sort function works only with mtg cards", () => {
  const data = [{}, {}, {}];
  const result = sortCards(data);
  expect(result).toBeNull();
});

// Test what checks the sort fucntions is actually sorting the datas
test("sort function actually sort the cards by cmc", () => {
  const data = [
    { object: "card", cmc: 1 },
    { object: "card", cmc: 3 },
    { object: "card", cmc: 2 },
  ];
  const result = sortCards(data);
  expect(result).toStrictEqual([
    { object: "card", cmc: 1 },
    { object: "card", cmc: 2 },
    { object: "card", cmc: 3 },
  ]);
});
