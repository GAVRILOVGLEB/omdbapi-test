import {
    saveDataToLocalStorage,
    validateForLocalStorage,
} from "../ui/components/Search/helpers";

describe("saveDataToLocalStorage", () => {
    it("should save data to localStorage with a default key if no optionalName is provided", () => {
        const testData: string[] = ["item1", "item2", "item3"];
        saveDataToLocalStorage(testData);
        expect(localStorage.getItem("defaultKey")).toEqual(
            JSON.stringify(testData),
        );
    });

    it("should save data to localStorage with the provided optionalName as the key", () => {
        const testData: string[] = ["item1", "item2", "item3"];
        const optionalName = "customKey";
        saveDataToLocalStorage(testData, optionalName);
        expect(localStorage.getItem(optionalName)).toEqual(
            JSON.stringify(testData),
        );
    });
});

describe("validateForLocalStorage", () => {
    it("should not throw error when data length is within limits", () => {
        const data = ["a", "b", "c"];
        expect(() => validateForLocalStorage(data)).not.toThrow();
    });

    it("should throw error when array contains more than 5 elements", () => {
        const data = ["a", "b", "c", "d", "e", "f"];
        expect(() => validateForLocalStorage(data)).toThrow(
            "Array contains more than 5 elements.",
        );
    });

    it("should throw error when data length exceeds maximum length for localstorage", () => {
        const data = ["a".repeat(5 * 1024)];
        expect(() => validateForLocalStorage(data)).toThrow(
            "Data length exceeds maximum length for localstorage.",
        );
    });

    it("should return an empty array if the input array is empty", () => {
        const emptyData: string[] = [];
        expect(validateForLocalStorage(emptyData)).toEqual([]);
    });
});
