// eslint-disable-next-line vue/custom-event-name-casing
export default {
  // localStorage: true,
  redirect: {
    callback: '/authorize', // User will be redirected to this path by the identity provider after login.
    logout: '/', // User will be redirected to this path if after logout, current route is protected
    login: '/', // User will be redirected to this path if login is required.
    user: '/user/profile',
    home: '/', // User will be redirect to this path after login
  },
  cookie: {
    options: {
      expires: 7,
    },
  },
  strategies: {
    local: {
      endpoints: {
        login: {
          url: 'auth/login',
          method: 'post',
          propertyName: 'access_token',
        },
        refresh: {
          url: 'auth/refresh',
        },
        logout: {
          url: 'auth/logout',
          method: 'post',
        },
        user: {
          url: 'auth/me',
          method: 'post',
          propertyName: '',
        },
      },
      tokenRequired: true,
      tokenType: 'bearer',
      autoFetchUser: true,
    },
    localRefresh: {
      // FIXME Set Refresh Token
      scheme: 'refresh',
      token: {
        property: 'token.accessToken',
        maxAge: 15,
      },
      refreshToken: {
        property: 'token.refreshToken',
        data: 'refreshToken',
        maxAge: false,
      },
    },
    facebook: {
      client_id: '1878784062256374',
      userinfo_endpoint:
        'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
      scope: ['public_profile', 'email', 'user_birthday'],
    },
    google: {
      client_id:
        '587037537287-12nhsrfaub0cg48rrgb27g0irmdj5dbn.apps.googleusercontent.com',
      // redirect_uri: 'http://localhost:3000/'
    },
    social: {
      _scheme: 'oauth2',
      authorization_endpoint: 'https://api.twitter.com/oauth2/token',
      userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
      scope: ['openid', 'profile', 'email'],
      access_type: undefined,
      access_token_endpoint: undefined,
      response_type: 'token',
      token_type: 'Bearer',
      redirect_uri: process.env._TWITTER_AUTH_REDIRECT_URL,
      client_id: 'SET_ME',
      token_key: 'access_token',
      state: 'UNIQUE_AND_NON_GUESSABLE',
    },
  },
}
