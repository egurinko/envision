# ENVISION

ENVISION is a web application for visualizing your working environment. It gets environmental data like CO2, temperature, humidity, lux and so on by using Raspberry pi 3 and some sensors.

[![JECT UI](https://user-images.githubusercontent.com/23233648/50395178-bccc1380-07a5-11e9-8b00-ead2f3fe7da6.png)](https://ject.netlify.com/)

## Table of content

- [Features](#Features)
- [Demo Page](#Demo-Page)
- [Setup](#Setup)
- [How it works](#How-it-works)
- [Links](#links)
- [Team JECT](#Team-JECT)

## Features

JECT provides four features,

1. Projection Practice to build a strong voice
   - Judge if your public speaking voice is loud enough for the audience.
   - Get real-time decibel information while rehearsing public speaking.
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/50395465-7d9ec200-07a7-11e9-9792-e76ec8951c0c.png" height="60%" width="60%">
     <br>
     <br>
2. Tongue Twister Practice for good pronunciation
   - Judge if your pronunciation can be understood by the audience
   - Please practice tongue twisters 10 times. You can get immediate results.
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/50395656-cefb8100-07a8-11e9-97ab-3231dc61d21f.png" height="40%" width="40%">
     <br>
     <br>
3. Karaoke Mode for building confidence
   - Learn to think on your feet and keep talking! <br>Even if you prepare well, sometimes things go wrong. Don't be upset.
   - First you get a random topic and then be shown five random pictures continuously. You should keep talking for five minutes while you follow the topic.
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/50395687-0702c400-07a9-11e9-9c72-be07fcd96658.png" height="60%" width="60%">
     <br>
     <br>
4. Statistics
   - Analyze data to see where you can improve.
   - You can check each session or daily average.
     <br>
     <br>
     <img src="https://user-images.githubusercontent.com/23233648/50395723-3adde980-07a9-11e9-823f-95d88f96b890.png" height="80%" width="80%">
     <br>
     <br>

## Demo Page

[Demo Page](https://ject.netlify.com/) is here! You can practice public speaking!

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
