const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User.js') 
const Image = require('./model/Image.js')
const multer = require('multer')
const app = express();
app.use(express.json());
const PORT=7777;
manik();


async function manik(){
        await mongoose.connect('mongodb://localhost:27017/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        //storage for multer
        const storage = multer.diskStorage({
            destination: 'uploads/', // Files will be stored in the 'uploads' directory
            filename: (req, file, cb) => {
              cb(null,file.originalname); // Generate unique filenames
            },
          });

        const upload = multer({ storage: storage });
          
        //GET API
        app.get('/manik/user/:email', async (req, res) => {
        const userEmail = req.params.email;
      
        try {
          // Find a user by email using the User model
          const user = await User.findOne({ email: userEmail });
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          // Respond with the user data
          res.json(user);
        } catch (error) {
          console.error('Error fetching user:', error);
          res.status(500).json({ error: 'Server error' });
        }
      });

    //POST API TO CREATE USER
      app.post('/manik/users', async (req, res) => {
        const { name, email, age } = req.body;
      
        // Create a new user instance
        const newUser = new User({
          name,
          email,
          age,
        });
      
        // Save the user to the database
        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser); // Respond with the saved user
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ error: 'Server error' });
        }
            });


      //POST API TO SAVE IMAGE
      app.post('/manik/upload/image', upload.single('file'), async (req, res) => {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create a new image instance
        const newImage = new Image({
          name : req.body.name,
          image :{
            data : req.file.filename,
            contentType : "image/png"
          }
        });
      
        // Save the user to the database
try {
    const savedImage = await newImage.save();
    res.status(201).json(savedImage); // Respond with the saved user
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Server error' });
  }
      });
}
app.listen(PORT);