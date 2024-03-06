import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as database from './config/database';
import flash from 'express-flash';
import cookieParser from "cookie-parser";
import session from "express-session";
import methodOverride from 'method-override';
import path from 'path';

import adminRoutes from './routes/admin/index.route';
import clientRoutes from './routes/client/index.route';
import { systemConfig } from './config/config';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

//Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// //parser application/json
app.use(bodyParser.json());

app.use(methodOverride("_method"));

//App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Admin routes
adminRoutes(app);

//Client routes
clientRoutes(app);

//TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce")));

app.use(express.static(`${__dirname}/public`));

//view
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});


