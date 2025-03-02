const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const Sentiment = require('vader-sentiment');
const cors = require('cors'); // Add this

const app = express();
app.use(cors()); // Add this

const twitterClient = new TwitterApi('YOUR_X_API_KEY');

app.get('/sentiment/:coin', (req, res) => {
  const coin = req.params.coin;
  const tweets = [`${coin} is hot!`, `Love ${coin} <3`, `${coin} should be avoided.`];
  let totalSentiment = 0;

  for (let i = 0; i < tweets.length; i++) {
    const score = Sentiment.SentimentIntensityAnalyzer.polarity_scores(tweets[i]);
    totalSentiment += score.compound;
  }

  const avgSentiment = totalSentiment / tweets.length;
  const trade = avgSentiment > 0 ? 'Buy' : 'Sell';

  res.json({ coin, sentiment: avgSentiment, trade });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server looping on ${PORT}`);
});
