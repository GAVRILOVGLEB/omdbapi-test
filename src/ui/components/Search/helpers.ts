import { useRef, useCallback, useEffect } from "react";

function validateForLocalStorage(data: string[]): string[] {
    if (data.length > 5) {
        throw new Error("Array contains more than 5 elements.");
    }

    if (JSON.stringify(data).length > 5 * 1024) {
        throw new Error("Data length exceeds maximum length for localstorage.");
    }

    return data;
}

function saveDataToLocalStorage(data: string[], optionalName?: string): void {
    if (optionalName) {
        localStorage.setItem(optionalName, JSON.stringify(data));
    } else {
        localStorage.setItem("defaultKey", JSON.stringify(data));
    }
}

function useDebouncedCallback<T extends (...args: string[]) => void>(
    callback: T,
    delay: number,
): (...args: Parameters<T>) => void {
    const timer = useRef<number | undefined>();

    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timer.current !== undefined) {
                clearTimeout(timer.current);
            }
            timer.current = window.setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );

    useEffect(() => {
        return () => {
            if (timer.current !== undefined) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return debouncedCallback;
}

export {
    validateForLocalStorage,
    saveDataToLocalStorage,
    useDebouncedCallback,
};
