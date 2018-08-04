var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  // config =
  // { test:
  //   { PORT: 3000,
  //     MONGODB_URI: 'mongodb://localhost:27017/TodoAppTest' },
  //  development:
  //   { PORT: 3000, MONGODB_URI: 'mongodb://localhost:27017/TodoApp' } }

  var envConfig = config[env]; // s tem dobim samo tisti objekt, ki ustreza parametru
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
// }