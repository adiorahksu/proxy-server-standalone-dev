const express = require('express');
const proxy = require('http-proxy-middleware');
const btoa = require('btoa');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const mongoose = require('mongoose');
const Ad = require('./models/ad');


const DB_URL = 'mongodb://51.91.126.70:27017/scraping_test';


if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
mongoose.set('useFindAndModify', false);
app.use(cors())


const options = {
    target: 'http://62.171.152.25:9200/',
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        const {
            body
        } = req;
        if (body) {
            if (typeof body === 'object') {
                proxyReq.write(JSON.stringify(body));
            } else {
                proxyReq.write(body);
            }
        }
    }
}

app.use(bodyParser.text({
    type: 'application/x-ndjson' // ! elasticsearch defined type - x-ndjson
}));


app.get('/ads/:id', function (req, res) {
    Ad.findById(req.params.id)
        .then(ad => {
            console.log("req" + req.params.id + " sending " + ad)
            res.send(ad)
        })
        .catch(err => next(err));
})

app.use((req, res, next) => {
    const {
        body
    } = req;
    //check jwt here then next
    next();
})
app.use('/scraping_test', proxy(options));

app.listen(7777, () => console.log('live @ 7777'));