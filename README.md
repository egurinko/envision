# ENVISION

ENVISION is a IoT web application for visualizing your working environment. It gets environmental data by using Raspberry pi 3 and some sensors.
This repo is the backend of ENVISION.

<div>
<img alt="Screen Shot 2019-09-02 at 8 20 05" src="https://user-images.githubusercontent.com/23233648/64083425-e7ba2e80-cd5a-11e9-82cd-60a45eec6aec.png" height="60%" width="60%">
<img alt="Screen Shot 2019-09-02 at 8 20 39" src="https://user-images.githubusercontent.com/23233648/64083447-35cf3200-cd5b-11e9-8e73-63d66f6f4ceb.png" height="30%" width="30%">
</div>

## Table of content

- [ENVISION](#envision)
  - [Table of content](#table-of-content)
  - [Features](#features)
  - [Demo Page](#demo-page)
  - [Setup](#setup)
    - [Clone](#clone)
    - [Infrastructure](#infrastructure)
    - [Local Development](#local-development)
  - [API ENDPOINT](#api-endpoint)
  - [How it works](#how-it-works)
  - [Links](#links)

## Features

ENVISION provides two features,

1. Provide comfort index calculated from sensory data
   - Show overall working comfort index
   - Show each comfort index of sensing data (like CO2, temperature...)
     <br>
     <br>
     <img width="60%" alt="Screen Shot 2019-09-02 at 8 22 02" src="https://user-images.githubusercontent.com/23233648/64083468-8050ae80-cd5b-11e9-9652-f9b301c5a362.png">
     <img width="39%" alt="Screen Shot 2019-09-02 at 8 22 12" src="https://user-images.githubusercontent.com/23233648/64083469-847ccc00-cd5b-11e9-997c-19ddf58aa1ae.png">
     <br>
     <br>

2. Data visualization of your working environment
   - Get sensory data of CO2, the amount of snack by weight, temperature, humidity, lux, pressure, color temperature
   - Provide real time visualization (update every mintue)
   - You can analyze and improve your working environment
     <br>
     <br>
     <img width="100%" alt="Screen Shot 2019-09-02 at 8 29 59" src="https://user-images.githubusercontent.com/23233648/64083501-df162800-cd5b-11e9-9e60-5c9402ba6725.png">
     <br>
     <br>


## Demo Page

[Demo Page](https://envision-iot.work) is here! You can check demo IoT project!

## Setup

### Clone

If you want to try ENVISION on your local machine, follow the instructions below.

1. Clone this repo

```
git clone https://github.com/egurinko/envision.git
```

2. Install all dependencies

```
cd envision
yarn
```

### Infrastructure

If you just clone this repo and you immediately would like to use it, use heroku to deploy. All environemtal setting is set for heroku.

1. Go to heroku and make an app with your cloned repo

2. Use add-ons of m-lab mongoDB

3. Get database url and database name 

4. Set environmental variable
```
MONGO_URL = <YOUR DATABASE URL>
DB_NAME = <YOUR DB NAME>
```

### Local Development

1. Added .env file. It's same as infrastructure setup #4

2. Build and start server
```
yarn build
yarn start
```

## API ENDPOINT

* /api/envs
  * POST
     ```json
     [
          {
               "type": "CO2",
               "value": 900
          },
          {
               "type": "temperature",
               "value": 23.4
          }
     ]
     ```
     request.body should be array. Inside of array, it should have type property to distingish what it is. type property become table name too. value is just a value.
  * GET
     Get the all types of data from mongodb. But it get recent 1 hour data.
* /api/comfort
  * POST
     It's for cron job to calculate comfort index. You don't have to use this endpoint for sending sensory data.
     ```json
     [
          {
               "key": "CO2",
               "value": 0.7
          },
          {
               "key": "temperature",
               "value": 0.6
          }
     ]
     ```
  * GET
     Get the all types comfort index and total comfort index like below.

## How it works

- Frontend<br>
  Vue/Vuex/Vuetify
- BACKEND<br>
  Express/mongodb/node-cron
- INFRASTRUCTURE
  Heroku/mLab MongoDB
- SENSORS<br>
  Raspberry pi 3 (CO2, temprature, humidity, weight, lux, pressure, color temperature)

## Links

- [DEMO PAGE](https://envision-iot.work)
- [Vue](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Express](https://expressjs.com/)
- [Heroku](https://dashboard.heroku.com/)
- [Raspberry pi](https://www.raspberrypi.org/)
