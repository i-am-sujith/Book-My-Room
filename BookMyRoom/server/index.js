const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const User = require('./models/User.js')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
const Place = require('./models/Place')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { log } = require('console')
const app = express()
const secretKey = 'secretKeyForTokenSign'

const bcryptSalt = bcrypt.genSaltSync(10)

app.use(express.json());
app.use(cookieParser())
app.use('/upload', express.static(__dirname + '/upload'))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

mongoose.connect('mongodb+srv://hiiamsujith:Xa9dOzRSlSB3vq1s@projectroombooking.ehwrqjy.mongodb.net/?retryWrites=true&w=majority&appName=projectRoomBooking')

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userDoc = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(400).json(e)
    }
})


app.post('/login', async (req, res) => {

    const { email, password } = req.body

    const userDoc = await User.findOne({ email })

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
                username: userDoc.username
            }, secretKey, {}, (err, token) => {
                if (err) res.json('cookie didnt worked')
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.status(404).json("password cannot fetch")
        }
    } else {
        res.status(404).json('cannot find email')

    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretKey, {}, async (err, userData) => {
            if (err) throw err
            const { username, email, id } = await User.findById(userData.id) //some mistake's in this line watch the video before moving into other part
            res.json({ username, email, id })
        })
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('logout')
})
app.post('/photo-by-link', async (req, res) => {
    const { link } = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/upload/' + newName
    })
    res.json(newName)
})


const photosMiddleware = multer({ dest: 'upload/' })
const uploadedFiles = []
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('upload\\', ''))
    }
    res.json(uploadedFiles)
    console.log(uploadedFiles);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies
    const {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraIfo,
        checkIn,
        checkOut,
        maxGuests,
    } = req.body
    jwt.verify(token, secretKey, {}, async (err, userData) => {
        if (err) throw err;
        await Place.create({
            owner:userData.id,
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraIfo,
            checkIn,
            checkOut,
            maxGuests,
        })

    })
})
console.log(User.objectId);

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.listen(4000) 