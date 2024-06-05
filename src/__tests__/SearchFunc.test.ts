import { updateSearchHistory } from "../application/updateSearchHistory";

describe("addToSearchHistory function", () => {
    test("Adding a new search term to an empty history set", () => {
        const historySet = new Set<string>();
        const testSet = updateSearchHistory("term", historySet);
        expect(testSet.size).toBe(1);
        expect(testSet.has("term")).toBeTruthy();
    });

    test("Adding a new search term to a history set with less than 5 items", () => {
        const historySet = new Set(["term1", "term2", "term3"]);
        const testSet = updateSearchHistory("term4", historySet);
        expect(testSet.size).toBe(4);
        expect(testSet.has("term4")).toBeTruthy();
    });

    test("Adding a new search term to a history set with exactly 5 items", () => {
        const historySet = new Set([
            "term1",
            "term2",
            "term3",
            "term4",
            "term5",
        ]);
        const testSet = updateSearchHistory("term6", historySet);
        expect(testSet.size).toBe(5);
        expect(testSet.has("term6")).toBeTruthy();
    });

    test("Adding a new search term to a history set with more than 5 items", () => {
        const historySet = new Set([
            "term1",
            "term2",
            "term3",
            "term4",
            "term5",
            "term6",
        ]);
        const testSet = updateSearchHistory("term7", historySet);
        expect(testSet.size).toBe(5);
        expect(testSet.has("term7")).toBeTruthy();
        expect(testSet.has("term6")).toBeFalsy();
    });
});
