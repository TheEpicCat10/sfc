const Ably = require('ably');

exports.handler = async function (event, context) {
  // Initialize the Ably REST client using the environment variable
  const rest = new Ably.Rest({ key: process.env.Ably_Key });

  try {
    // Request a token request on behalf of the client
    // You can also assign a unique clientId here if handling users
    const tokenRequestData = await new Promise((resolve, reject) => {
      rest.auth.createTokenRequest({ clientId: 'html5-app-user' }, (err, tokenRequest) => {
        if (err) reject(err);
        else resolve(tokenRequest);
      });
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokenRequestData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate Ably token request' }),
    };
  }
};