const express = require('express')
const app = express()
const session = require('express-session');
const port = 3000
const routes = require('./routes/index');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
  secret: 'End My Sufferrr',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true, 
}
}))

app.use('/', routes)

app.listen(port, () => {
  console.log(`pair project mantapppp`, port)
})


// {
//   type: DataTypes.STRING,
//   allowNull: false,
//   validate: {
//     notEmpty: {
//       msg: `Email is required`
//     },
//     notNull: {
//       msg: `Email is required`
//     }
//   }
// }

// {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   validate: {
//     notEmpty: {
//       msg: `Email is required`
//     },
//     notNull: {
//       msg: `Email is required`
//     }
//   }
// }