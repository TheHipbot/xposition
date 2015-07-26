# xposition
A webapp built with web2py and three.js. Users are presented with a sphere composed of points. Each point is named, but the 
name is unknown to the front-end application. Users select a section of the sphere and the included point data is 
sent to the back end and determines the names of the points in the section.

To run for development:
```
docker run -d -p 80:80 -p 443:443 -v /path/to/local/xposition:/home/www-data/web2py/applications/init -d thehipbot/web2py
```

To build Docker image then run (from project directory):
```
docker build -t thehipbot/xposition .
docker run -d -p 80:80 -p 443:443 thehipbot/xposition
```