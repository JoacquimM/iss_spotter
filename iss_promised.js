const request = require('request-promise-native');

const fetchMyIP = ()=> {
  return request('https://api.ipify.org?format=json'); // returning a promise
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  console.log(body);
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};



const nextISSTimesForMyLocation = function() { // every function thats being called here returns a promise
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


  // module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes,};
module.exports = { nextISSTimesForMyLocation};