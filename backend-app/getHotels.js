const request = require('request-promise-native');
const redisClient = require('redis').createClient();

module.exports = function _getHotels(req, res) {
  const data = req.query;

  redisClient.hget('hotels', JSON.stringify(data), (err, reply) => {
    if (reply) {
      res.send(JSON.parse(reply));
    } else {
      _fetchHotels(data, res);
    }
  });
};

function _fetchHotels(data, response) {
  const snapTravel = request(_getRequestOptions(data, 'snaptravel'));
  const hotelsDotCom = request(_getRequestOptions(data, 'retail'));

  Promise.all([snapTravel, hotelsDotCom])
    .then(([snapData, hotelsData]) => {
      const labeledSnapData = _setSourcePrice(snapData['hotels'], 'snapTravel');
      const labeledHotelsDotCom = _setSourcePrice(hotelsData['hotels'], 'hotelsDotCom');

      let hotels = labeledSnapData.concat(labeledHotelsDotCom);
      hotels = hotels.filter(_filterHotelsWrapper());

      redisClient.hset('hotels', JSON.stringify(data), JSON.stringify(hotels));

      response.send(hotels);
    });
}

function _filterHotelsWrapper() {
  const idPriceMap = {};

  return function _filterHotels(hotel) {
    if (hotel.id in idPriceMap) {
      const price = idPriceMap[hotel.id];
      hotel[price.key] = price.value;
      return true;

    } else {
      const priceKey = hotel.source + 'Price';
      idPriceMap[hotel.id] = {key: priceKey, value: hotel[priceKey]};
      return false;
    }
  }

}


function _setSourcePrice(hotels, source) {
  return hotels.map(({price, ..._hotel}) => {
    return Object.assign({}, _hotel, {source, [source + 'Price']: price})
  });
}


function _getRequestOptions(data, provider) {
  return {
    method: 'POST',
    uri: 'https://experimentation.getsnaptravel.com/interview/hotels',
    body: Object.assign({}, data, {provider}),
    json: true,
  }
}
