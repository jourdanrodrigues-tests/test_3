(function () {
  fetch('/api/hotels/' + location.search)
    .then(response => response.json())
    .then(hotels => {
      const hotelList = document.querySelector('.hotelList');

      const table = document.createElement('table');
      table.border = '1';
      table.style.cssText = 'width: 100%';

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
      row.className = 'id_' + hotel.id;

      for (let key in defaultKeys) {
        const column = document.createElement('td');
        column.className = key;
        column.style.cssText = 'text-align: center';
        const content = document.createElement(defaultKeys[key]);

        if (key === 'id') {
          content.style.cssText = 'font-weight: bold';
        }

        if (key === 'image_url') {
          content.src = hotel.image_url.replace(/https?:/, '');
          content.style.cssText = 'width: 17em';
        } else if (key === 'amenities') {
          content.innerHTML = hotel.amenities.join('\n');
          content.style.cssText = 'white-space: pre-line';
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

