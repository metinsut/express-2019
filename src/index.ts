import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import { database } from './database';
import { optionsCors } from './config/cors';
import routes from './routes';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL;

const app = express();
database();

if (!dev) {
   /* Helmet helps secure our app by setting various HTTP headers */
   app.use(helmet());
   /* Compression gives us gzip compression */
   app.use(compression());
}

if (dev) {
   // Logger middleware
   app.use(morgan('tiny'));
}

// cors helps for our app headers normalize
app.use(cors(optionsCors));

// express middleware for json body parser
app.use(express.json());

// express validator Middleware
app.use(expressValidator());

app.use('/api', routes);

app.listen(port, () => console.log('App is listening on port ' + ROOT_URL));
