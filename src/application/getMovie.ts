import { Movie } from "../domain/movie";
import { AppErrorType, createAppError } from "./appError";
import useMovies from "../infrastructure/MovieAdapter";
import storageServiceAdapter from "../infrastructure/storageAdapter";
import { MovieService, StorageService } from "./ports";

type Deps = {
    movieService: MovieService;
    movieStorage: StorageService["movieStorage"];
    isRefreshingStorage: StorageService["isRefreshingStorage"];
    errorStorage: StorageService["errorStorage"];
};

const defaultDeps: Deps = {
    movieService: useMovies,
    movieStorage: storageServiceAdapter.movieStorage,
    isRefreshingStorage: storageServiceAdapter.isRefreshingStorage,
    errorStorage: storageServiceAdapter.errorStorage,
};

async function getMovie(
    search: string,
    deps: Deps = defaultDeps,
): Promise<Movie[] | undefined> {
    const { movieStorage, movieService, isRefreshingStorage, errorStorage } =
        deps;
    try {
        isRefreshingStorage.set(true);
        const movie = await movieService.getMovie(search);

        if (movie.Error) {
            throw new Error(`[GET_MOVIES]: ${movie.Error}`);
        }

        const movies = movieStorage.get();

        if (!movies.find(m => m.Title === movie.Title)) {
            movieStorage.update(s => {
                s.push(movie);
            });
        }

        isRefreshingStorage.set(false);

        return movies;
    } catch (error) {
        isRefreshingStorage.set(false);
        const appError = createAppError(
            new Error((error as Error).message),
            AppErrorType.ReadData,
        );
        errorStorage.error.set(appError);
        isRefreshingStorage.set(false);
    }
}

export default getMovie;
