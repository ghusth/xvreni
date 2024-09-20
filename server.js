const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Inicializar la app
const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(error => console.error('Error conectando a MongoDB Atlas:', error));

// Definir el esquema y modelo
const guestSchema = new mongoose.Schema({
  phone: String,
  name: String,
  confirm: String,
});

const Guest = mongoose.model('Guest', guestSchema);

// Ruta para buscar por teléfono
app.get('/guest/:phone', async (req, res) => {
  const phone = req.params.phone;
  const guests = await Guest.find({ phone });
  if (guests.length > 0) {
    res.json(guests);
  } else {
    res.status(404).json({ message: 'No se encontró ningún invitado.' });
  }
});

// Ruta para actualizar confirmación
app.post('/guest/confirm', async (req, res) => {
  const { phone, confirm } = req.body;
  const guest = await Guest.findOne({ phone });
  if (guest) {
    guest.confirm = confirm;
    await guest.save();
    res.json({ message: 'Confirmación actualizada.' });
  } else {
    res.status(404).json({ message: 'No se encontró ningún invitado.' });
  }
});

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
