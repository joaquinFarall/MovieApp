/* To start the project:
>npm init
>npm i express ejs path request --save */

// Require dependencies
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/search', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {
    let query = req.query.search; // requesting the query (parameter) in the url

    request('https://api.themoviedb.org/3/search/movie?api_key=d7d94c7165e0c4f32c5a48fbb2a323e2&query='+query, (error, response, body) => {
        if(error) console.log(error);

        let data = JSON.parse(body); // transform the string from the API to JSON
        res.render('movies', {data: data, searchQuery: query});
        
    });
});


app.listen(3000, () => {
    console.log('Server started at port 3000');
});