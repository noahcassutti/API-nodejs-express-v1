const express = require('express');
const cors = require('cors');
const app = express();
port = 6500;

const studentsRoutes = require('./routes/studentsRoutes');
const profesorsRoutes = require('./routes/profesorsRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
app.use(express.json());
app.use(cors());
app.use('/students', studentsRoutes);
app.use('/profesors', profesorsRoutes);
app.use('/courses', coursesRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

