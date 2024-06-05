import { createState } from "@persevie/statemanjs";
import { Movie } from "../../domain/movie";
import { AppError } from "../../application/appError";
const moviesState = createState<Movie[]>([]);
const searchState = createState<string | null>(null);

const appErrorState = createState<AppError | null>(null);
const isRefreshingState = createState<boolean>(false);

export { moviesState, searchState, appErrorState, isRefreshingState };
