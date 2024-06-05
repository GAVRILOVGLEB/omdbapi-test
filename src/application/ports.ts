import { Movie } from "../domain/movie";
import { AppError } from "./appError";

export type MovieService = {
    getMovie(search: string): Promise<Movie>;
};

export type StorageUpdateCb<T> = (storageValue: T) => void;

// Storage services
type _BaseStorageAPI<T> = {
    set(el: T): void;
    get(): T;
    update(updateCb: StorageUpdateCb<T>): void;
};

export type MovieStorageService = _BaseStorageAPI<Movie[]>;
export type SearchStorageService = _BaseStorageAPI<string | null>;

export type ErrorStorageService = {
    error: _BaseStorageAPI<AppError | null>;
};

export type IsRefreshingStorageService = _BaseStorageAPI<boolean>;

export type StorageService = {
    searchStorage: SearchStorageService;
    movieStorage: MovieStorageService;
    errorStorage: ErrorStorageService;
    isRefreshingStorage: IsRefreshingStorageService;
};
