import express from 'express';
import { Request, Response } from 'express';
import { Database } from './_class/database';
import { authenticateToken } from './middleware/auth.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import movieRoutes from './routes/movie.routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

//* Inicia a conexão do banco
new Database();

app.use(express.json());

//* Rotas referentes a autenticação
app.use('/auth', authRoutes);

//* Rotas referentes aos usuários
app.use('/users', authenticateToken, userRoutes);

//* Rotas referentes aos filmes e votos
app.use('/movies', authenticateToken, movieRoutes);

//* Tratamento para qualquer outra rota
app.use('*', (req: Request, res: Response) => {
	res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});

export default app;