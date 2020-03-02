
/*
lets rethink this a little bit; we lots of data to begin with, so the model could actually come up with something

*/

const mongoose = require('mongoose');
const shortid = require('shortid'); //implement this as id
shortid.seed(41412);

let adSchema = new mongoose.Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    headline: String,
    url: String,
    image: String,
    displayUrl: String,
    dateAdded: Date,
    trafficSource: String,
    websiteScrapedFrom: String,
    ip: String,
    region: String,
    country: String,
    city: String,
    ISP: String,
    userAgent: String,
    ipInfoJSON: String,



    loggerUrl: String,
    published_date: String,
    publisher: String,
    signature: String,
    item_id: String,
    category: String,




    //IDEAS, not live
    urlChain: [String], // not implemented
    tags: [String],  //not implemented
    newsArticle: {
        title: String,              //possibly to make it so we can learn more about the whole process of why the ad was on this placement, etc
        content: String,            //this will probably go 2 the analysis part of the project, where the crawler will get the page and then insert to elastic so it's searchable
        keywords: String
    }

    
});


let Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;


