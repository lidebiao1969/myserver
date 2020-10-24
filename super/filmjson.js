var request = require("request");
var getupcomingjson = (res) => {
  var url =
    "http://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a";
  request(url, function (error, response, body, next) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
};

var gethotjson = (res) => {
  var url =
    "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a";
  request(url, function (error, response, body, next) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
};

var gettopjson = (res) => {
  var url =
    "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a";
  request(url, function (error, response, body, next) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
};

module.exports = {
  getupcomingjson,
  gethotjson,
  gettopjson,
};
