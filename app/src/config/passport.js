const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

// Configuración de la estrategia OAuth2
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://authorization-server.com/auth',
    tokenURL: 'https://authorization-server.com/token',
    clientID: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'http://localhost:4000/auth/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    // Aquí puedes buscar o crear el usuario en tu base de datos
    User.findOrCreate({ oauthId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Serializar y deserializar usuario para la sesión
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
