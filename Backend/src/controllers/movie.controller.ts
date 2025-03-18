import { Request, Response } from 'express';
import { MovieService } from '../services/movie.service';
import { VoteService } from '../services/vote.service';
import { conflictReturn } from '../support/support';

export class MovieController {
    static async getAllMovies(req: Request, res: Response): Promise<void> {
        const moviesInfo = await MovieService.getMovie();
        res.json(moviesInfo);
    }

    static async createMovie(req: Request, res: Response): Promise<void> {
        const user_id = req.tokenJWT.userId;
        const { title, director, genre, synopsis, release, cast} = req.body;

        //* Verifica se já não existe um filme com esse nome
        var movieInfo = await MovieService.getMovie('title = ?', [ title ]);

        if (movieInfo.length != 0) {
            // movieInfo[0].cast = MovieService.getMovieCast(movieInfo[0].id);
            // res.status(409).json(movieInfo[0]);
            return conflictReturn(res);
        }

        //* Converte release para date
        const releaseAtTimestamp = new Date(release * 1000);
        const releaseToSave  = releaseAtTimestamp.toISOString().slice(0, 19).replace('T', ' ');

        movieInfo = await MovieService.insertMovie(user_id, title, director, genre, releaseToSave, synopsis);
        var movieCast = await MovieService.insertCast(movieInfo[0].id, cast);

        movieInfo[0].cast = movieCast;

        res.status(201).json(movieInfo);
    }

    static async getMovie(req: Request, res: Response): Promise<void> {
        const user_id = req.tokenJWT.userId;
        const movie_id = Number(req.params.id);

        const movieInfo = (await MovieService.getMovie('id = ?', [ movie_id ]));
        if (movieInfo.length == 0) {
            res.json({});
            return;
        }

        const movieCast = await MovieService.getMovieCast(movieInfo[0].id);

        movieInfo[0].cast = movieCast;

        var user_vote = await VoteService.getVotes('user_id = ? AND movie_id = ?', [ user_id, movie_id ]);
        movieInfo[0].vote_user = (user_vote.length != 0 ? user_vote[0].vote : 0);

        var user_avarage = await VoteService.getAvarageVote(movie_id);
        movieInfo[0].vote_average = user_avarage;

        res.json(movieInfo);
    }

    static async updateMovie(req: Request, res: Response): Promise<void> {
        const movie_id = Number(req.params.id);
        const { title, director, genre, synopsis, release, cast} = req.body;

        //* Verifica se já não existe um filme com esse nome
        var movieInfo = await MovieService.getMovie('title = ?', [ title ]);

        if (movieInfo.length != 0 && movieInfo[0].id != movie_id) {
            // movieInfo[0].cast = await MovieService.getMovieCast(movieInfo[0].id);
            // res.status(409).json(movieInfo[0]);
            return conflictReturn(res);
        }

        //* Converte release para date
        const releaseAtTimestamp = new Date(release * 1000);
        const releaseToSave  = releaseAtTimestamp.toISOString().slice(0, 19).replace('T', ' ');

        movieInfo = await MovieService.updateMovie(movie_id, title, director, genre, releaseToSave, synopsis);
        var movieCast = await MovieService.updateCast(movieInfo[0].id, cast);

        movieInfo[0].cast = movieCast;

        res.status(200).json(movieInfo);
    }

    static async deleteMovie(req: Request, res: Response): Promise<void> {
        const movie_id = Number(req.params.id);

        await VoteService.removeMovieVotes(movie_id);
        await MovieService.removeAllMovieCast(movie_id);
        await MovieService.removeMovie(movie_id);

        res.status(204).json();
    }
}