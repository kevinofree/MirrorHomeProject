# Smart Mirror
My first attempt at making a smart mirror application. This application displays current weather, weekly forecast, and the time. Written using AngularJS and node. There are still some bugs that need to be fixed.

Screenshot:
![alt text](https://github.com/kevinofree/MirrorHomeProject/blob/master/Screen.png "Screnshot of Project")

## Installing
Install NodeJS.

https://nodejs.org/en/download/

Run the application

```node app.js ```

## OpenWeatherMap
Before using this project you need to register at https://openweathermap.org/api
for an API key.

Replace API_key with the one you are given on the website. Also update the config file with your location, and choice of weather format (metric/imperial).

``` vim config.json ```
## Resources
Here are sources of information I used to create this project.

https://www.w3schools.com/ https://docs.angularjs.org/api/ng/service/$q https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular https://stackoverflow.com/ https://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html https://stackoverflow.com/questions/16930473/angularjs-factory-http-get-json-file
