var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

router.get('/hotkeys', function(req, res){
    fs.readFile('./hotkeys/' + req.query.app + '.json', function(err, data) {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

router.get('/apps', function(req, res){
    fs.readFile('./hotkeys/apps.json', function(err, data) {
        // res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

// router.post('/hotkeys', function(req,res) {
//     fs.readFile('/hotkeys/atom.json', function(err, data) {
//         var comments = JSON.parse(data);
//         console.log(err);
//         comments.push(req.body);
//         fs.writeFile('/hotkeys/atom.json', JSON.stringify(comments, null, 4), function(err) {
//             res.setHeader('Cache-Control', 'no-cache');
//             res.json(comments);
//         });
//     });
// });

module.exports = router;
