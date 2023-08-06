const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './.env' });

const app = express();

// cors
app.use(cors());

// request payload middileware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', require('./routes/userRoutes'));
app.use('/player', require('./routes/playerRoutes'));
app.use('/game', require('./routes/gameRoutes'));
app.use('/shop', require('./routes/team-spirit-routes/shopRoutes'));
app.use('/water', require('./routes/team-spirit-routes/waterRoutes'));
app.use('/tree', require('./routes/team-spirit-routes/treeRoutes'));
app.use('/level', require('./routes/integrity-routes/levelRoutes'));
app.use('/item', require('./routes/integrity-routes/itemRoutes'));
app.use('/character', require('./routes/characterRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
