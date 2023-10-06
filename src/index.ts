import express, { Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { configDotenv } from 'dotenv';
import { routes } from './routes';
import swaggerDocument from './swagger.json';
import swaggerJSDoc from 'swagger-jsdoc';

configDotenv();
const app = express();
const serverRoutes = routes;
app.use(cors());
app.use(express.json());
app.use(routes);
app.get('/', (_, res: Response) => {
  res.send('Server Working Just Fine');
});
const specs = swaggerJSDoc(swaggerDocument);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(process.env.PORT, () => {
  console.log(`🔥 Server Running on Port: ${process.env.PORT} 🔥`);
});
