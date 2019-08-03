# bookSearch


##### heroku deployment

```bash
heroku create
```
Go to heroku page and add mongodb

Get mongo uri for heroku
```
heroku config:get MONGODB_URI
```
Should be automatically configured on heroku page


```
git push heroku master
```