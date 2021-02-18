import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@memory_map/common';
import { createBlockRouter } from './routes/new';
import { getBreadcrumbRouter } from './routes/breadcrumb';
import { descendants } from './routes/descendants';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);

app.use(createBlockRouter);
app.use(getBreadcrumbRouter);
app.use(descendants);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
