# Project summary

This is Udacity - Project 7 of the Front End Web Developer. It aims to pull all the skills learnt in the course of the program. The project is very JavaScript heavy, but it is still expected to create clean and appealing HTML/CSS. It will also be targeting the DOM, working with objects, and retrieving data from 3 APIs in which one is reliant on another to work. Finally, all these is going to be done in a Webpack environment, using an express server, and wrapped up with service workers.The code need to be refactor and test as much as possible while building. 

## What to build.

You will be building a travel application which pulls in multiple types of data, from different sources and occasionally one API will be required to get data from another API. The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. The ```Weatherbit API ```is going to be used which only takes in coordinates for weather data from ```Geonames API```. Once we have all of this data, you will want to display an image of the location entered; for this, you will be using the ```Pixabay API```. One thing to note is to plan out the logic of what you want build and it is recommended that after you meet the minimum requirements in the rubric, you continue debugging the UX and improve the project.

### What to learn

You have learn all the technical skills needed for this project and as you go along building the travel map, some of these questions will come up

•	What’s the ideal workflow?
•	How many files do I need?
•	How do I convert one project into another?
•	Should I redo the HTML/CSS first or go straight to the javascript?
•	How many JavaScript functions do I need?
•	Should my function be this many lines of code?
•	Is readability or performance more important?

The answers to the question will all be answered as you go on in the project.

#### Getting started

This project requires to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

# Getting the starter code

Code from Project 3 could be duplicated as starter code but starting from the scratch without any files is always encouraged. Be well acquited with project 3 & 4 as you go on in the project. 

## Create these folders

Use the skills in project 4 to get the development environment going.

# src folder

. client 
- js folder
- media folder
- styles

. server folder
- server.js 

. views folder
- index.html

.styles
- .css files to be converted to .scss folder

Although, names of the folders may vary.

- Install the dependencies as required 

npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D clean-webpack-plugin
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin etc.,

Can refer to project 4 for reference.

### Get the webpack going

Remember that webpack builds a dist file. So, server.js needs to be updated to access the dist file. [Hint: app.use(express. .....)]

Next, update the scripts in package.json i.e. test, dev, start and build.
```NOTE:``` Start for express server, dev will be so that you can take the advantage of web dev server which can be run with one command depending on the set up.

#### Get webpack config set up

To get the webpack running, First run ```npm run dev```, then ```npm build``` to get the ```dist``` folder created. Once it is created ```npm run dev``` and ```npm start``` can be run simultaneously to have hot loading of your project as well as a working express environment.  

# Create account with Geonames api

After craeting the account, then replace the ```openweather api``` with ```geonames api``` . But instead of entering a zip code, you enter a city to get the ```latitude```, ```longitude ```, ```country```, instead of getting the ```temperature```, ```feeling```, and ```date```.

## Introduce a countdown

To add text field to the project to get the date noting the type of input , cross browser rendering, how soon the trip is, how can you get the information from the DOM to see how soon the date is. Then where should the data be stored once you have it. 

### Create account with Weatherbit

Integrating the ```Weatherbit API``` is similar to how the ```geonames api``` is integrated. 

#### Create an account with Pixabay

Just the same way you created account with ```Weatherbit api``` and ```geonames api```.

Note: 
- The information to submit to the API to achieve an appropriate image.
- What parameters to set to pull in images
- How to submit your data from the location field to a ```pixabay URL parameters``` without having spaces in the url?
An item should be choosen from the suggested list to add in.

##### Refactoring

Refactor as much as possible as you develop. After cleaning the project up. Add the service worker. Refer to project 4 for guidance. In case you are adding any suggested task in the project Roadmap/Strategy, It is recommended to hold off the service worker until about to submit.

- Extend your Project Further - Roadmap/Strategy
To extend project further, end date and length of trip has been displayed.

###### References

```http://www.geonames.org/```
```https://www.weatherbit.io/api```
```https://restcountries.eu/#api-endpoints```
```https://pixabay.com/api/docs/```
```https://pixabay.com/photos/dubai-skyline-city-architecture-2292779/```
```https://jestjs.io/docs/en/getting-started.html```
```Getting stated with Unit testing- JEST```
```Endpoint testing with Jest and Supertest | Zell Liew```