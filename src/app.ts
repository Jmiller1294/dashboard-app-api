import express, {Request, Response, NextFunction, json} from 'express';
import todoRoutes from './routes/todos.router';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import api from './routes/api';

//creates express application
const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(morgan('combined'));

//app.use(json());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: err.message});
});

app.use('/v1', api);

export default app;




