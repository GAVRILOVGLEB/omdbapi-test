import { StorageService } from "../application/ports";
import { Movie } from "../domain/movie";
import {
    appErrorState,
    moviesState,
    isRefreshingState,
    searchState,
} from "./storage/storageService";

const storageServiceAdapter: StorageService = {
    movieStorage: {
        set: function (el: Movie[]): void {
            moviesState.set(el);
        },
        get: function (): Movie[] | [] {
            return moviesState.get();
        },
        update: moviesState.update,
    },
    searchStorage: {
        set: function (el: string | null): void {
            searchState.set(el);
        },
        get: function (): string | null {
            return searchState.get();
        },
        update: searchState.update,
    },
    errorStorage: {
        error: appErrorState,
    },
    isRefreshingStorage: {
        set: isRefreshingState.set,
        get: isRefreshingState.get,
        update: isRefreshingState.update,
    },
};

export default storageServiceAdapter;
