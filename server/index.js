require('dotenv').config();
const express = require('express');
const cors = require('cors');

const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('Car AI Recommendation Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
