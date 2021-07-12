const express = require('express')
const bodyParser = require('body-parser')
const register = require('react-server-dom-webpack/node-register')
const babelRegister = require('@babel/register')
const {fetchLatLng, fetchWeather} = require('./controller')

babelRegister({
  // eslint-disable-next-line no-useless-escape
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs']
})

const path = require('path')

const React = require('react')
const ReactApp = require('../src/App.server').default
require('dotenv').config()

register()

const PORT = 4000

const app = new express() //eslint-disable-line

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Expose-Headers', 'Authorization')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

app.use(bodyParser.json())

app.use(express.json());

app.use(express.static('build'));
app.use(express.static('public'));

app.listen(PORT, err => {
  if (!err) console.log(`Application Running on port ${4000}`) //eslint-disable-line
  else console.log(err) //eslint-disable-line
})

app.get(
  '/',
  async (req, res) => {
    const html = readFileSync(
      path.resolve(__dirname, '../build/index.html'),
      'utf8'
    );
    res.send(html);
  }
);

app.get('/react', function(req, res) {
  
  const props = JSON.parse(req.query.props);
  res.set('X-Props', JSON.stringify(props));
  const manifest = readFileSync(
    path.resolve(__dirname, '../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  return pipeToNodeWritable(React.createElement(ReactApp, props), res, moduleMap);

});

app.get('/latng', (req, res) => {
  fetchLatLng(req, res)
})

app.get('/weather', (req, res) => {
  fetchWeather(req, res)
})



