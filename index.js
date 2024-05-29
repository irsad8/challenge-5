const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routerAPI = require('./routes/routeAPI');
const routerViews = require('./routes/routeViews');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use('/API', routerAPI);
app.use('/', routerViews);

app.listen(process.env.PORT, ()=> {
    console.log('server anda telah berjalan pada port:' + process.env.PORT)
});