import express, { Response } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import { routes } from './routes';
configDotenv();
const app = express();
const serverRoutes = routes;
app.use(cors());
app.use(express.json());
app.use(routes);
app.get('/', (_, res: Response) => {
  res.send('Server Working Just Fine');
});
app.listen(process.env.PORT, () => {
  console.log(`🔥 Server Running on Port: ${process.env.PORT} 🔥`);
});
