import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import bootstrap from './bootstrap.js';
import dbCon from './db/conDb.js';
import { cloudinaryConfig } from './utils/cloudinaryConfig.js';
const app =express();
app.use(cors());
dotenv.config();
cloudinaryConfig();
const port = 3000;
dbCon();
bootstrap(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));