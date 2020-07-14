# seatus-webapp [Wyth Home](https://gowyth.com/)

![Wyth](https://github.com/safwan-lewis/seatus-webapp/blob/master/src/assets/img/page1.png)

Wyth is a college carpooling app for students traveling long distances – home, school events, and trips during winter/spring breaks. Wyth is designed exclusively for college students and provides a platform for students to share rides, offset travel costs and meet new friends along the way. Tell us where and when you need to go along with your preferences and the app will match you with drivers going the same way you are.

### Install

1.  Download the project's zip
2.  Type `npm install` in terminal/console in the source folder where `package.json` is located
3.  Run in terminal `npm start`.

### Docker Time

Run `docker login` in the terminal and enter your newly created credentials.


Run the following command in your app’s root directory.

`docker run --rm -ti -p 80:80 --name running-node-container node:boron bash`


Your terminal should look something like

`root@c62cdbc950de:/#`


Go ahead and install one as well as a server for our application.

`apt-get update`

`apt-get install vim`

`apt-get install nginx`


Here we are creating a new container image called gowyth/node-vim-nginx from the running-node-container.

`docker commit running-node-container gowyth/node-vim-nginx`

Prefixing a Docker image with your Docker hub username allows you to use your personal Docker hub repository via the docker push command.

`docker push gowyth/node-vim-nginx`



### Build

`npm run deploy` or `npm run deploy:dev`, `npm run deploy:prod`

### Build Docker

`npm run build:prod`

### Start and Stop Docker

`npm run start:prod`

`npm run stop:prod`

### Social Media

Twitter: <https://twitter.com/Gowyth>

Facebook: <https://www.facebook.com/Gowyth>

Instagram: <https://www.instagram.com/gowyth>
