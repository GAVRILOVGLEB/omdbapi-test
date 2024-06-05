import React, {
    useCallback,
    ChangeEvent,
    useState,
    useEffect,
    useMemo,
} from "react";
import {
    makeStyles,
    InputOnChangeData,
    Input,
    Option,
} from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import "./Search.scss";
import getMovies from "../../../application/getMovie";
import { AppErrorType, createAppError } from "../../../application/appError";
import {
    appErrorState,
    isRefreshingState,
} from "../../../infrastructure/storage/storageService";
import {
    saveDataToLocalStorage,
    useDebouncedCallback,
    validateForLocalStorage,
} from "./helpers";
import { updateSearchHistory } from "../../../application/updateSearchHistory";
import { useStatemanjs } from "@persevie/statemanjs-react";

const useStyles = makeStyles({
    search: { height: "32px", maxWidth: "610px", width: "100%" },
});

function Search(): JSX.Element {
    const isRefreshing = useStatemanjs(isRefreshingState);

    const classes = useStyles();
    const [text, setText] = useState<string>("");
    const [searchHistory, setSearchHistory] = useState<Set<string>>(
        new Set<string>(),
    );
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const savedSearchHistory = localStorage.getItem("searchHistory");
        if (savedSearchHistory) {
            setSearchHistory(new Set(JSON.parse(savedSearchHistory)));
        }
    }, []);

    const request = useCallback(
        async (value: string): Promise<void> => {
            try {
                if (value.trim() === "") return;
                setShowHistory(false);

                const updatedHistory = updateSearchHistory(
                    value,
                    searchHistory,
                );
                validateForLocalStorage([...updatedHistory]);
                saveDataToLocalStorage([...updatedHistory], "searchHistory");

                setSearchHistory(updatedHistory);

                await getMovies(value);
            } catch (error) {
                const appError = createAppError(
                    new Error((error as Error).message),
                    AppErrorType.ReadData,
                );
                appErrorState.set(appError);
            }
        },
        [searchHistory],
    );

    const debouncedRequest = useDebouncedCallback(request, 1000);

    const handleInput = useCallback(
        (_ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
            setText(data.value);
            debouncedRequest(data.value);
        },
        [debouncedRequest],
    );

    const handleChangeOption = useCallback(
        (value: string): void => {
            setText(value);
            debouncedRequest(value);
        },
        [debouncedRequest],
    );

    const memoizedSearchHistory = useMemo(
        () => [...searchHistory],
        [searchHistory],
    );

    return (
        <div className="search">
            <Input
                contentBefore={<SearchRegular />}
                type="search"
                appearance="filled-lighter"
                placeholder="Search"
                aria-label="Search"
                className={classes.search}
                onChange={handleInput}
                value={text}
                onFocus={(): void => setShowHistory(true)}
                disabled={isRefreshing}
            />

            {showHistory && (
                <div className="search-history">
                    {memoizedSearchHistory.map((query, index) => (
                        <Option
                            className="search-list-item"
                            key={index}
                            onClick={(): void => handleChangeOption(query)}
                        >
                            {query}
                        </Option>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
