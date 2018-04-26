module.exports = function _hotelsView(req, res) {
  const data = req.query;
  const params = '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');

  res.redirect('/list.html' + params);
};
