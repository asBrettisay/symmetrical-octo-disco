const
      express    = require('express')
    , session    = require('express-session')
    , bodyParser = require('body-parser')
    , passport   = require('passport')
    , GithubStrategy = require('passport-github').Strategy
    , config     = require('./.config');


const app = express();

app.use(express.static('public'))
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.secret
}))

passport.use(new GithubStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, (token, tokenSecret, profile, done) => {
  done(null, profile)
}))

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}


app.get('/auth/github', passport.authenticate('github'))
app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/auth/github'
}), (req, res) => {
  req.session.user = loggedInUser;
  req.session.following = logginedInUser;
  res.send(req.session);
}, (err) => {
  if (err) {
    res.redirect('/auth/github')
  } else {
    res.send(req.session);
  }
})

app.get('/api/github/following', requireAuth, (req, res, next) => {
  axios.get(
    `http://www.github.com/users/${req.session.user.username}/following`
  )
  .then(r => res.status(302).send(r))
  .catch(err => res.status(404).send(err));
})

app.listen(3000, () => {
  console.log('Listening...')
})
