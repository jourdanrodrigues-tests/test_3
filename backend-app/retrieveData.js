const request = require('request-promise-native');

const _snapTravelSource = 'snapTravel';
const _hotelsDotComSource = 'hotelsDotCom';

const redisClient = require('redis').createClient();

module.exports = {
  getHotels: _getHotels,
  hotelsView: _hotelsView,
};

function _hotelsView(req, res) {
  const data = req.query;
  const params = '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');

  res.redirect('/list.html' + params);
}


function _getHotels(req, res) {
  redisClient.get('hotels', (err, reply) => {
    if (reply) {
      res.send(JSON.parse(reply));
    } else {
      _fetchHotels(req.query, res);
    }
  });
}

function _fetchHotels(data, response) {
  const snapTravel = request(_getRequestOptions(data, 'snaptravel'));
  const hotelsDotCom = request(_getRequestOptions(data, 'retail'));

  Promise.all([snapTravel, hotelsDotCom])
    .then(([snapData, hotelsData]) => {
      const labeledSnapData = _setSourcePrice(snapData['hotels'], _snapTravelSource);
      const labeledHotelsDotCom = _setSourcePrice(hotelsData['hotels'], _hotelsDotComSource);

      let hotels = labeledSnapData.concat(labeledHotelsDotCom);
      hotels = hotels.filter(_filterHotelsWrapper({}));

      redisClient.set('hotels', JSON.stringify(hotels));

      response.send(hotels);
    });
}

function _filterHotelsWrapper(idPriceMap) {

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