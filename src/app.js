import express from 'express';

import acaoRoutes from './routes/acao.routes.js';
import campanhaRoutes from './routes/campanha.routes.js';
import doacaoRoutes from './routes/doacao.routes.js';
import doadorRoutes from './routes/doador.routes.js';
import voluntarioRoutes from './routes/voluntario.routes.js';

const app = express();

app.use(express.json());

app.use('/acoes', acaoRoutes);
app.use('/campanhas', campanhaRoutes);
app.use('/doacoes', doacaoRoutes);
app.use('/doadores', doadorRoutes);
app.use('/voluntarios', voluntarioRoutes);

export default app;