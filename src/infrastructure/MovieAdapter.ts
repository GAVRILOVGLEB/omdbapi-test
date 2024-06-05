import { MovieService } from "../application/ports";
import { Movie } from "../domain/movie";

class MovieServiceAdapter implements MovieService {
    constructor() {
        this.getMovie = this.getMovie.bind(this);
    }

    async getMovie(search: string): Promise<Movie> {
        const res = await fetch(
            `http://www.omdbapi.com/?i=${process.env.IMDb_ID}&apikey=${process.env.API_KEY}&t=${search}`,
            {
                method: "GET",
            },
        );

        const movie = await res.json();

        return movie;
    }
}

const useMovies = new MovieServiceAdapter();

export default useMovies;
