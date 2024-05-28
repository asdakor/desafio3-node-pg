import 'dotenv/config'
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

const __dirname = import.meta.dirname;

const app = express()

app.use(express.static(path.join(__dirname, '/public')));
//MIDELWARES BODY
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//HANDLEBARS CONFIG
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'./views'));

app.get('/', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})