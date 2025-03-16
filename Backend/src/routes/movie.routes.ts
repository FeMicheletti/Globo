import { Router } from 'express';
import { isAdmin } from '../middleware/admin.middleware';
import { VoteController } from '../controllers/vote.controller';
import { MovieController } from '../controllers/movie.controller';
import { validationPostMovie } from '../middleware/validationPostMovie.middleware';
import { validationPostVote } from '../middleware/validationPostVote.middleware';

const router = Router();

//* Filmes
router.get('/', MovieController.getAllMovies);
router.post('/', isAdmin, validationPostMovie, MovieController.createMovie);
router.get('/:id', MovieController.getMovie);
router.put('/:id', isAdmin, validationPostMovie, MovieController.updateMovie);
router.delete('/:id', isAdmin, MovieController.deleteMovie);

//* Votos
router.put('/:id/vote', validationPostVote, VoteController.makeVote);

export default router;