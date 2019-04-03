const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pino = require('express-pino-logger')();
const { RpcClient } = require('tendermint')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(pino);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello World!` }));
  let client = RpcClient('ws://localhost:46657')
  client.block({ height: 10 })
    .then((res) => res.send(res))
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);