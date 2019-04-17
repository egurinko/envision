# ENVISION

ENVISION is a IoT web application for visualizing your working environment. It gets environmental data by using Raspberry pi 3 and some sensors.

<div>
<img src="https://user-images.githubusercontent.com/23233648/56307166-2de16d80-617f-11e9-81a7-19d25ef8ce67.png" height="60%" width="60%">
<img src="https://user-images.githubusercontent.com/23233648/56307474-e27b8f00-617f-11e9-976d-04d9984c0423.png" height="30%" width="30%">
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

1. Provide comfort index from sensory data
   - Show overall working comfort index
   - Show comfort index of each sensing data
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/56307166-2de16d80-617f-11e9-81a7-19d25ef8ce67.png" height="100%" width="100%">
     <br>
     <br>

2. Data visualization of your working environment
   - Get sensory data of CO2, the amount of snack by weight, temperature, humidity, lux, pressure, color temperature
   - Provide real time visualization (update every mintue)
   - You can analyze and improve your working environment
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/56305853-05a43f80-617c-11e9-84ce-bf020ef9fc5a.png" height="100%" width="100%">
     <br>
     <br>


## Demo Page

[Demo Page](https://prod-bot-staging.herokuapp.com/) is here! You can check demo IoT project!

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

- [DEMO PAGE](https://prod-bot-staging.herokuapp.com/)
- [Vue](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Express](https://expressjs.com/)
- [Heroku](https://dashboard.heroku.com/)
- [Raspberry pi](https://www.raspberrypi.org/)
