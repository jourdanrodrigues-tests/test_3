# Fullstack Demo
This is our task for potential new fullstack engineers. We expect this task to take less than a few hours of work

Please clone this repo, create your own branch 'firstname-lastname' and make a starting commit with the message 'start'.
Commit your code to your branch and push your branch to origin when you are finished. Thanks 😄

## TODO

Implement a simple web app that serves html.

**Step 1**

The app should load an form with the following fields
- City string input
- Checkin string input
- Checkout string input
- submit button

The 3 inputs will be string inputs. Do not worry about form validation and or any styling.

**Step 2**

When the form is submitted make **2 HTTP POST requests** in parallel to 'https://experimentation.getsnaptravel.com/interview/hotels' with the following request body

```
{
  city : city_string_input,
  checkin : checkin_string_input,
  checkout : checkout_string_input,
  provider : 'snaptravel'
}
```

1) This above return SnapTravel rates for hotels in the city

```
{
  city : city_string_input,
  checkin : checkin_string_input,
  checkout : checkout_string_input,
  provider : 'retail'
}
```

2) This above return Hotels.com rates for hotels in the city

The responses will be a json which has an array of hotels and prices.
```
[{
  id : 12,
  hotel_name : 'Center Hilton',
  num_reviews : 209,
  address : '12 Wall Street, Very Large City',
  num_stars : 4,
  amenities : ['Wi-Fi', 'Parking'],
  image_url : 'https://images.trvl-media.com/hotels/1000000/20000/19600/19558/19558_410_b.jpg',
  price : 132.11
},
...
]
```

Make sure to cache these responses (assume the endpoint is expensive to call) in whatever way that seems fit using whatever cache that seems fit (db, redis, in memory etc)

After both these calls have returned take **only** the hotels that appear in both the responses and return an html table with the data. (you can display the data in anyway you wish as long as the data is in a table with a row for each entry)

For example, if the first call returned hotels with id [10,12] with SnapTravel prices 192 and 112 and the second call returned hotels [12,13] with Hotels.com prices 321 and 132 respectively, you would only render hotel 2 in the list with a Hotels.com price of 112 and a SnapTravel price of 132

![](https://i.imgur.com/fqT65hx.png)

## Notes
* If you run into any technical difficulties contact henry@getsnaptravel.com
* If you wish to write tests you can but it is not a strict requirement.