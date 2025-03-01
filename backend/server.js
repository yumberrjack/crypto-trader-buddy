const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const Sentiment = require('vader-sentiment');

const app = express();
const twitterClient = new TwitterApi('X_API_KEY'); // Enter API key

app.get('/sentiment/:coin', (req, res) => {
  const coin = req.params.coin;
  // Fake tweets for now—replace with real API call later
  const tweets = [`${coin} is mooning!`, `Love ${coin}`, `${coin} sucks`];
  let totalSentiment = 0;

  // Loop through tweets, your style
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