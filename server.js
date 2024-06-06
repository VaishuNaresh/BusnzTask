const express = require('express')
const mysql=require('mysql')
const cors = require('cors')
const app = express();
const {Sequelize,DataTypes} = require('sequelize')
app.use(express.json())
app.use(cors());

const sequelize = new Sequelize('busnzTask', "root", "",{
    host: 'localhost',
  dialect:'mysql'  
    
})
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection test successfully');
  } catch (error) {
    console.error('Error occurred', error);
  }
}

testConnection();
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.post('/api/users', async (req, res) => {
  try {
     console.log('Request Body:', req.body)
    const { username, email, password,confirmPassword} = req.body;
    const user = await User.create({ username, email, password,confirmPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(8080, () =>
{
    console.log('Listening')
})
