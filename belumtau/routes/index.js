const router = require('express').Router()
const Controller = require('../controllers/controller');

router.get('/register', Controller.registerPage)
router.post('/register', Controller.handleRegister)
router.get('/register/:id/profile', Controller.profileAddPage)
router.post('/register/:id/profile', Controller.handleProfile)

router.get('/login', Controller.loginPage)
router.post('/login', Controller.handleLogin)

router.use((req, res, next) => {
  if (req.session.AdminId) {
    next()
  }else{
    res.redirect('/login')
  }
})

router.get('/login/:id/home', Controller.homePage)
router.get('/login/:id/courses', Controller.coursesPage)
router.get('/login/:id/profile', Controller.profilePage) 
router.get('/login/:id/courses/add', Controller.addCourse)
router.post('/login/:id/courses/add', Controller.handleAddCourse) 
router.get('/login/:id/courses/:cid/edit', Controller.editCourse) 
router.post('/login/:id/courses/:cid/edit', Controller.handleEditCourse) 
router.get('/login/:id/courses/:cid/delete', Controller.deleteCourse) 
router.get('/login/:id/courses/:cid/detail/:course', Controller.courseDetail) 



module.exports = router