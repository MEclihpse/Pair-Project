const { Op } = require('sequelize');
const { Admin, Profile, Course } = require('../models/index');
const formatDate = require('../helpers/dateFormat');

class Controller {
    static loginPage(req, res){
        res.render('signin')
    }

    static handleLogin(req, res){
        const {email, password} = req.body
        Admin.findOne({
            where: {
                [Op.or]: {
                    email,
                    username: email
                } 
            }
        })
            .then(data => {
                if (data.password !== password) {
                    throw `Username or Password not correct`
                }
                res.redirect(`/login/${data.id}/home`)
            })
            .catch(err => res.send(err))
    }

    static registerPage(req, res){
        res.render('registerform')
    }

    static handleRegister(req, res){
        const {email, username, password, role} = req.body
        Admin.create({
            email,
            username,
            password,
            role
        })
            .then(data => {
                res.redirect(`/register/${data.id}/profile`)
            })
            .catch(err => res.send(err))
    }

    static profileAddPage(req, res){
        const id = +req.params.id
        res.render('profileform', {id})
    }

    static handleProfile(req, res){
        const id = +req.params.id
        const {firstName, lastName, bio, picture} = req.body
        Profile.create({
            firstName,
            lastName,
            bio,
            picture,
            AdminId: id
        })
            .then(data => {
                res.redirect('/login')
            })
            .catch(err => res.send(err))
    }

    static homePage(req, res){
        const id = +req.params.id
        res.render('homeademy', {id})
    }

    static coursesPage(req, res){
        const id = +req.params.id
        let role = ``
        Admin.findByPk(id)
            .then(data => {
                role = data.role
                return Course.findAll({
                    include: Admin
                })    
            })
            .then(data => {
                console.log(data);
                res.render('coursesPage', {data, id, formatDate, role})
            })
            .catch(err => res.send(err))
    }
    
    static courseDetail(req, res){
        const id = +req.params.id
        const cid = +req.params.cid
        const courseId = +req.params.course
        Admin.findOne({
            include: 
            [
                {
                    model: Profile,
                    where: {AdminId: cid}
                }, 
                {
                    model: Course,
                    where: {id: courseId}
                }
            ]
        })
            .then(data => {
                res.render('coursedetail', {data, id, formatDate})
            })
            .catch(err => res.send(err))
    }

    static deleteCourse(req, res){
        const id = +req.params.cid
        const id2 = +req.params.id
        Course.destroy({
            where: {
                id: id
            }
        })
            .then(data => {
                res.redirect(`/login/${id2}/courses`)
            })
            .catch(err => res.send(err))
    }

    static profilePage(req, res){
        const id = +req.params.id
        Profile.findOne({
            where: {AdminId: id}
        })
            .then(data => {
                res.render('profilePage', {data, id})
            })
            .catch(err => res.send(err))
    }

    static addCourse(req, res){
        const id = +req.params.id
        res.render('addcourse.ejs', {id})
    }

    static handleAddCourse(req, res){
        const id = +req.params.id
        const {nameCourse, description, duration} = req.body
        Course.create({
            nameCourse,
            description,
            duration,
            AdminId: id
        })
            .then(data => {
                res.redirect(`/login/${id}/courses`)
            })
            .catch(err => res.send(err))
    }

    static editCourse(req, res){
        const id = +req.params.id
        const cid = +req.params.cid
        Course.findByPk(cid)
            .then(data => {
                res.render('editCourse', {data, id})
            })
            .catch(err => res.send(err))
    }

    static handleEditCourse(req, res){
        const id = +req.params.id
        const cid = +req.params.cid
        const {nameCourse, description, duration} = req.body
        Course.update({
            nameCourse,
            description,
            duration
        },{
            where:{
                id: cid
            }
        })
            .then(data => {
                res.redirect(`/login/${id}/courses`)
            })
            .catch(err => res.send(err))

    }
}

module.exports = Controller