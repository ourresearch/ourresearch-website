const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

let app = express();


// this was helpful for configs:
// https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
app.use(serveStatic(__dirname + "/dist"));



app.get('*', function (req, res) {
    // if (!req.secure){
    //     res.redirect("https://" + req.hostname + req.path)
    // }
    //
    if (req.hostname !== "ourresearch.org") {
        res.redirect("https://ourresearch.org" + req.path)
    }

    res.sendfile('./dist/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port)
});