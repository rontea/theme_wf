const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.CONSUMER_API_KEY,
  appSecret: process.env.CONSUMER_API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function tweetRelease() {
  try {
    const message = `Released ${process.env.RELEASE_NAME}\n${process.env.RELEASE_URL}`;
    await client.v2.tweet(message);
    console.log('Tweeted:', message);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

tweetRelease();
