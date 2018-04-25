(function () {
  fetch('/api/hotels/' + location.search)
    .then(response => response.json())
    .then(hotels => {
      const hotelList = document.querySelector('.hotelList');

      const table = document.createElement('table');

      const headers = [
        'Hotel id', 'Hotel Name', 'Number of views', 'Address', 'Number of stars',
        'Amenities', 'Image', 'Snaptravel Price', 'Hotel.com Price',
      ];
      const tableHeader = _getTableHeader(headers);
      table.appendChild(tableHeader);

      _setTableBody(table, hotels);

      hotelList.appendChild(table);
    });

  function _setTableBody(table, hotels) {
    const defaultKeys = {
      'id': 'span',
      'hotel_name': 'span',
      'num_reviews': 'span',
      'address': 'span',
      'num_stars': 'span',
      'amenities': 'span',
      'image_url': 'img',
      'snapTravelPrice': 'span',
      'hotelsDotComPrice': 'span',
    };

    hotels.forEach(hotel => {
      const row = document.createElement('tr');

      for (let key in defaultKeys) {
        const column = document.createElement('td');
        const content = document.createElement(defaultKeys[key]);

        if (key === 'image_url') {
          content.src = hotel.image_url.replace(/https?:/, '');
          content.style.cssText = 'width: 20em';
        } else if (key === 'amenities') {
          content.innerHTML = hotel.amenities.join('\n');
        } else {
          content.innerHTML = hotel[key];
        }

        column.appendChild(content);
        row.appendChild(column);
      }

      table.appendChild(row);
    });
  }

  function _getTableHeader(labelList) {
    const row = document.createElement('tr');

    labelList.forEach(label => {
      const head = document.createElement('th');
      head.innerHTML = label;
      row.appendChild(head);
    });

    return row
  }
})();

