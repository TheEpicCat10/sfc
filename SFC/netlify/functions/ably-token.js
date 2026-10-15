const Ably = require('ably');

exports.handler = async function () {
  const apiKey = process.env.Alby_Key;

  if (!apiKey) {
    console.error('Environment variable Alby_Key is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ably key is not configured' }),
    };
  }

  try {
    const rest = new Ably.Rest({ key: apiKey });

    // Ably v2 is promise-based: callbacks are no longer supported
    const tokenRequest = await rest.auth.createTokenRequest({
      clientId: 'html5-app-user',
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokenRequest),
    };
  } catch (error) {
    // Shows up in Netlify > Logs > Functions
    console.error('Ably token error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate Ably token request' }),
    };
  }
};