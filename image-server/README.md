# Image server

This HTTP server returns images stored in the folder /public/img, to start working with it, simply use the following commands:

```
npm install
npm start
```

## API usage

The API uses the path "/public/img/:name"

Example: `GET /public/img/card_back.png` will return the image "card_back.png".
