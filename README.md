# ENVISION

ENVISION is a web application for visualizing your working environment. It gets environmental data like CO2, temperature, the amount of snack by weight, humidity, lux and so on by using Raspberry pi 3 and some sensors.

[![ENVISION UI](https://user-images.githubusercontent.com/23233648/50395178-bccc1380-07a5-11e9-8b00-ead2f3fe7da6.png)](https://ject.netlify.com/)

## Table of content

- [Features](#Features)
- [Demo Page](#Demo-Page)
- [Setup](#Setup)
- [How it works](#How-it-works)
- [Links](#links)
- [Team JECT](#Team-JECT)

## Features

ENVISION provides two features,

1. Data visualization of your working environment
   - Get sensing data of CO2, temperature, humidity, lux, pressure
   - Provide real time visualization (update every mintue)
   - You can analyze and improve your working environment
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/50395465-7d9ec200-07a7-11e9-9792-e76ec8951c0c.png" height="60%" width="60%">
     <br>
     <br>
2. Provide comfort index from data
   - Show overall working comfort index
   - Show comfort index of each sensing data
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/50395656-cefb8100-07a8-11e9-97ab-3231dc61d21f.png" height="40%" width="40%">
     <br>
     <br>

## Demo Page

[Demo Page](https://prod-bot-staging.herokuapp.com/) is here! You can check demo IoT project!

## Setup

If you want to try JECT on your local machine, follow the instructions below.

1. Clone this repo

```
git clone https://github.com/cc6-ject/ject-frontend.git
```

2. Install all dependencies

```
cd ject-frontend
yarn
```

3. Start local server

```
yarn start
```

4. Go to browser and type "localhost:3000"

## How it works

- Frontend<br>
  React
- UI<br>
  MATERIAL-UI
- Speech Recognition<br>
  Web API
- Audio Context<br>
  Web API

## Links

- [Web Site](https://ject.netlify.com/)
- [React](https://reactjs.org/)
- [MATERIAL-UI](https://material-ui.com/)
- [MDN](https://developer.mozilla.org/en-US/)

## Team JECT

### Follow us on Github:

- [daenamkim](https://github.com/daenamkim)
- [egurinko](https://github.com/egurinko)
- [mp40](https://github.com/mp40)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
