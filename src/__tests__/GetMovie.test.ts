import { AppError } from "../application/appError";
import getMovie from "../application/getMovie";
import { StorageUpdateCb } from "../application/ports";
import { Movie } from "../domain/movie";

const searchQuery = "test";
const movieTemp: Movie = { Title: "OLD TEST" } as Movie;

describe("getMovie", () => {
    it("it should return UNDEFINED because it returned an error in service getMovie", async () => {
        const movie = await getMovie(searchQuery, {
            movieService: {
                getMovie(_search: string) {
                    return new Promise<Movie>((resolve, _reject) => {
                        resolve({ Error: "ERROR" } as Movie);
                    });
                },
            },
            errorStorage: {
                error: {
                    set: (el: AppError | null): void => {
                        el;
                    },
                    get: (): AppError | null => {
                        return null;
                    },
                    update: (
                        updateCb: StorageUpdateCb<AppError | null>,
                    ): void => {
                        updateCb;
                    },
                },
            },
            isRefreshingStorage: {
                set: (el: boolean): void => {
                    el;
                },
                get: (): boolean => {
                    return true;
                },
                update: (updateCb: StorageUpdateCb<boolean>): void => {
                    updateCb;
                },
            },
            movieStorage: {
                set: (el: Movie[]): void => {
                    el;
                },
                get: (): Movie[] => {
                    return [movieTemp];
                },
                update: (updateCb: StorageUpdateCb<Movie[]>): void => {
                    updateCb;
                },
            },
        });

        expect(movie).toBeUndefined();
    });

    it("it should return UNDEFINED because it throwed an error in service getMovie", async () => {
        const movie = await getMovie(searchQuery, {
            movieService: {
                getMovie(_search: string) {
                    return new Promise<Movie>((_resolve, _reject) => {
                        throw new Error("Something happened");
                    });
                },
            },
            errorStorage: {
                error: {
                    set: (el: AppError | null): void => {
                        el;
                    },
                    get: (): AppError | null => {
                        return null;
                    },
                    update: (
                        updateCb: StorageUpdateCb<AppError | null>,
                    ): void => {
                        updateCb;
                    },
                },
            },
            isRefreshingStorage: {
                set: (el: boolean): void => {
                    el;
                },
                get: (): boolean => {
                    return true;
                },
                update: (updateCb: StorageUpdateCb<boolean>): void => {
                    updateCb;
                },
            },
            movieStorage: {
                set: (el: Movie[]): void => {
                    el;
                },
                get: (): Movie[] => {
                    return [movieTemp];
                },
                update: (updateCb: StorageUpdateCb<Movie[]>): void => {
                    updateCb;
                },
            },
        });

        expect(movie).toBeUndefined();
    });

    it("it should return array of Movies", async () => {
        const storage = [movieTemp];

        await getMovie(searchQuery, {
            movieService: {
                getMovie(_search: string) {
                    return new Promise<Movie>((resolve, _reject) => {
                        resolve({ Title: "Test" } as Movie);
                    });
                },
            },
            errorStorage: {
                error: {
                    set: (el: AppError | null): void => {
                        el;
                    },
                    get: (): AppError | null => {
                        return null;
                    },
                    update: (
                        updateCb: StorageUpdateCb<AppError | null>,
                    ): void => {
                        updateCb;
                    },
                },
            },
            isRefreshingStorage: {
                set: (el: boolean): void => {
                    el;
                },
                get: (): boolean => {
                    return true;
                },
                update: (updateCb: StorageUpdateCb<boolean>): void => {
                    updateCb;
                },
            },
            movieStorage: {
                set: (el: Movie[]): void => {
                    el;
                },
                get: (): Movie[] => {
                    return storage;
                },
                update: (updateCb: StorageUpdateCb<Movie[]>): void => {
                    updateCb(storage);
                },
            },
        });

        expect(storage.length).toBe(2);
    });
});
