import express from 'express';
import { Connect } from './connection.js';
import { router } from './routes/url.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/url",router);

Connect("mongodb://localhost:27017/ShortnerUrl")
.then(() => console.log("MonboDb Connected !!"));

app.listen(PORT ,(req, res) => {
    console.log(`Server is Running on PORT : ${PORT}`);
});
