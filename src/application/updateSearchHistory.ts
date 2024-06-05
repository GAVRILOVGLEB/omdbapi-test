function updateSearchHistory(
    value: string,
    searchHistory: Set<string>,
): Set<string> {
    const updatedHistory = new Set<string>();

    updatedHistory.add(value.trim());

    searchHistory.forEach(item => {
        if (updatedHistory.size < 5) {
            updatedHistory.add(item);
        }
    });

    return updatedHistory;
}

export { updateSearchHistory };
