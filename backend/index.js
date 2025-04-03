import express from 'express';
import { Connect } from './connection.js';
import { router } from './routes/url.js';
import {userrouter} from './routes/user.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { analyticRouter } from './routes/analytics.js';
import { qrrouter } from './routes/qrcode.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({origin:"https://tinyyqr.vercel.app", credentials: true }));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use("/url",router);
app.use("/user",userrouter);
app.use("/analysis",analyticRouter);
app.use("/qrcode",qrrouter);

Connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDb Connected !!"));

app.listen(PORT ,(req, res) => {
    console.log(`Server is Running on PORT : ${PORT}`);
});
