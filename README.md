# ENVISION

ENVISION is a IoT web application for visualizing your working environment. It gets environmental data by using Raspberry pi 3 and some sensors.

<img src="https://user-images.githubusercontent.com/23233648/56307166-2de16d80-617f-11e9-81a7-19d25ef8ce67.png" height="60%" width="60%">
<img src="https://user-images.githubusercontent.com/23233648/56307474-e27b8f00-617f-11e9-976d-04d9984c0423.png" height="35%" width="35%">


## Table of content

- [Features](#Features)
- [Demo Page](#Demo-Page)
- [Setup](#Setup)
- [How it works](#How-it-works)
- [Links](#links)
- [Team JECT](#Team-JECT)

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

If you want to try ENVISION on your local machine, follow the instructions below.

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
