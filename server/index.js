const express = require('express');
// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
const FeedModel = require('./models/feed');

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Ensure the app can handle JSON requests

// Global variable for access token (consider storing it in a safer way for production)
global.access_token = '';

const uri = 'mongodb+srv://phillabitad:0nPIJ8HDv1vRpxeP@cluster0.lnxpmn3.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = 'http://localhost:3000/auth/callback';

let feedsCollection;

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('spotify_music_db');
    feedsCollection = database.collection('feedcollection');
    tracksCollection = database.collection('music_tracks');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Call the function to establish connection
connectToDB();
// Function to generate a random string
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// API endpoint to get feed data
app.get('/api/feed', async (req, res) => {
  try {
    const feed = await feedsCollection.find().toArray();
    if (feed.length === 0) {
      console.log('No feed data found');
    }
    res.json(feed);
  } catch (err) {
    console.error('Error fetching feed data:', err);
    res.status(500).json({ message: 'Error fetching feed data' });
  }
});

app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await tracksCollection.find().toArray();
    if (tracks.length === 0) {
      console.log('No feed data found');
    }
    res.json(tracks);
  } catch (err) {
    console.error('Error fetching track data:', err);
    res.status(500).json({ message: 'Error fetching track data' });
  }
});

// mongoose.connect('mongodb+srv://phillabitad:0nPIJ8HDv1vRpxeP@cluster0.lnxpmn3.mongodb.net/spotify_music_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB')

// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err.message);
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function() {
//   console.log('MongoDB connected successfully');
// });


// // Endpoint to get feed data
// app.get('/api/feed', async (req, res) => {
//   try {
//     const feed = await FeedModel.find(); // Mongoose query
//     if (feed.length === 0) {
//       console.log('No feed data found'); // Debug log if feed is empty
//     }
//     res.json(feed);
//   } catch (err) {
//     console.error('Error fetching feed data:', err); // Improved error handling
//     res.status(500).json({ message: 'Error fetching feed data' });
//   }
// });

// Define the GET /auth/feed endpoint

// const testFeed = new FeedModel({
//   _id:"670f9eb16327d07fceaa9b21",
//   profile:"User1",
//   description:"Sample description 1",
//   url:"https://www.youtube.com/watch?v=abc123",
//   image_url:"https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat.jpg",
//   timestamp:"2023-12-01T12:34:56Z"
// });

// app.get('/api/feed', async (req, res) => {
//   try {
//     const feeds = await FeedModel.find({});
//     res.json(feeds);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving feeds', error });
//   }
// });

app.get('/auth/login', (req, res) => {

  var scope = "streaming user-read-email user-read-private"
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

// app.get('/auth/callback', (req, res) => {

//   var code = req.query.code;

//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: spotify_redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
//       'Content-Type' : 'application/x-www-form-urlencoded'
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       access_token = body.access_token;
//       res.redirect('/')
//     }
//   });

// })
app.get('/auth/callback', async (req, res) => {
  try {
    console.log('Query Parameters:', req.query);
    const code = req.query.code;
    console.log('Authorization Code:', code);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code'
      })
    });

    if (response.ok) {
      const data = await response.json();
      access_token = data.access_token;
      res.redirect('/');
    } else {
      const responseText = await response.text();
      console.error('Spotify token request failed:', response.status, responseText);

      res.status(response.status).send(`Failed to authenticate with Spotify: ${responseText}`);
    }
  } catch (error) {
    console.error('Error during authentication process:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/auth/token', (req, res) => {
  res.json({ access_token: access_token})
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
