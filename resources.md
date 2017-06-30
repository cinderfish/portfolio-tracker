# Stocks and Stuff

Description and stuff

http://ivomynttinen.com/work/portfolius
https://library.jitta.com/en/article/jitta-portfolio-series-4-learning-from-your-past-investments

## Portfolio
Each user has one "portfolio" that keeps track of all their shares. Users can label their holdings and filter views based on those labels.

## Transactions
This will be a transaction based data entry system. Users will enter transactions over the course of their interactions with us.

### Purchase
A purchase of a stock adds shares to their portfolio.
- If a user has stock symbol in holdings:
 - Increase their amount
 - Update the average value
- else
 - Add stock and value to user's holdings
 - if symbol is globally new, add to global monitor

```{
  "id": "sha1(exchange-symbol-entered)",
  "type": "purchase",
  "exchange": "nyse",
  "symbol": "chtr",
  "avg_cost": 0.3542, // average cost of all purchases
  "amount": 1000,
  "entered": 123493920202, // timestamp, when transaction was entered to site
  "transaction_time": 2948483982929, // timestamp, when transaction was performed
  "labels": [
    "foo",
    "bar"
  ]
}
```

### Sale
A sale removes some of a user's shares from their portfolio
- If user sold all holdings of symbol:
 - remove stock symbol from holdings
 - if symbol is no longer globally used, remove from global monitor
- else
 - decrease their holding amount of symbol

```{
  "id": "sha1(exchange-symbol-entered)",
  "type": "sale",
  "exchange": "nyse",
  "symbol": "chtr",
  "avg_cost": 0.3542, // average cost of all purchases
  "amount": 1000,
  "entered": 123493920202, // timestamp, when transaction was entered to site
  "transaction_time": 2948483982929, // timestamp, when transaction was performed
  "labels": [
    "foo",
    "bar"
  ]
}
```

### Split
A split transaction indicates that a holding has split and their holding amount/cost should adjust.
- Multiply `amount` by ratio, rounding based on value
- Divide `average_cost` by ratio, rounding down

```{
  "id": "sha1(exchange-symbol-entered)",
  "type": "split",
  "exchange": "nyse",
  "symbol": "ptx",
  "ratio": 0.033333333, // floating ratio to apply, beware floating point maths!
  "round": "down", // When applying ratio to # of shares, which direction to round (usually down)
  "entered": 123493920202, // timestamp, when transaction was entered to site
  "transaction_time": 2948483982929, // timestamp, when transaction was performed
  "labels": [
    "foo",
    "bar"
  ]
}
```

## Cash
Keeps track of any free cash you may have. Users can increment/decrement at will

## API
The API provides the following endpoints.



## Ideas
- Day Trades
 - Denote if a sale is considered a day trade
 - Allow users to set warnings/thresholds like *# day trades in X days*
- Cash
 - Allow multiple "buckets/accounts" (maybe by labels?)
- Reports
 - Create a scoring system that gets updated once a day
 - Score calculated by judging each possbile transaction
   - If buy, divide price paid by that day's low, minus 1
   - If sale, divide price recieved by that day's high, minus 1, ABS
   - Average all values, subtract from 1 to recieve that day's total score
   - Highest score is 1
   - Example:
     - I bought PTX at 0.35, it's low for the day was 0.32, value: 0.09375, Score: *0.91*
     - I bought DERP at 22.45, it's low for the day was 12.34, value: 0.819286872, Score: *0.18*
     - I sold DING at 0.22, it's high for the day was 0.22, value: 0, Score: *1*
     - I sold BUTS at 33.45, it's high for the day was 33.67, value: 0.006534007, Score: *0.99*
     - Total score: (0.006534007+0.819286872+0.09375)/4 = 0.22989272, Score: 1 - 0.22989272 = *0.77* (edited)

[8:03]
Sample DB:
```{
  "config": {
    "stocks": {
      "api": {
        "url": "http://some.url/api/stock/${stock_id}?key=${key}",
        "key": "jalkjsdlkjsdlksd"
      },
      "monitor": [
        "nyse:chtr",
        "nyse:ptx"
      ]
    }
  },
  "users": {
    "GUID()": {
      "id": "GUID()",
      "info": {
        "username": "floopy",
        "email": "floopy@bar.com",
        "name": {
          "first": "Floopish",
          "last": "Bartonite"
        },
        "password": "hashed-password-with-secret-salt",
        "secret": "some-salt-secret",
        "reset": {
          "key": "lekjsdlkjsdflsdlkfsdf",
          "expires": 192839283929
        },
        "oauth": {
          "provider": "facebook",
          "token": "lkasjwkskska;",
          "expires": 19238292983
        }
      },
      "preferences": {

      },
      "labels": [
        "foo",
        "bar"
      ],
      "cash": 1000.00,
      "holdings": {
        "nyse:chtr": {
          "id": "nyse:chtr",
          "amount": 1000,
          "exchange": "nyse",
          "symbol": "chtr",
          "avg_cost": 0.3543,
          "labels": [
            "foo",
            "bar"
          ],
          "updated": 12939838493
        },
        "nyse:ptx": {
          "id": "nyse:ptx",
          "amount": 500,
          "exchange": "nyse",
          "symbol": "ptx",
          "avg_cost": 0.3543,
          "labels": [
            "foo"
          ],
          "updated": 12939838493
        }
      },
      "transactions": [
        {
          "id": "sha1(exchange-symbol-entered)",
          "type": "purchase",
          "exchange": "nyse",
          "symbol": "chtr",
          "avg_cost": 0.3542,
          "amount": 1000,
          "entered": 123493920202,
          "transaction_time": 2948483982929,
          "labels": [
            "foo",
            "bar"
          ]
        },
        {
          "id": "sha1(exchange-symbol-entered)",
          "type": "sale",
          "exchange": "nyse",
          "symbol": "ptx",
          "avg_cost": 0.3542,
          "amount": -1000,
          "entered": 123493920202,
          "transaction_time": 2948483982929,
          "labels": [
            "foo",
            "bar"
          ]
        },
        {
          "id": "sha1(exchange-symbol-entered)",
          "type": "split",
          "exchange": "nyse",
          "symbol": "ptx",
          "ratio": 0.033333333,
          "round": "down",
          "entered": 123493920202,
          "transaction_time": 2948483982929,
          "labels": [
            "foo",
            "bar"
          ]
        }
      ]
    }
  }
}
