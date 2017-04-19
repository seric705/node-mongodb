var User = require('../models/user')

// userlist page
exports.userlist = function(req, res) {
  User.fetch(function(err, users) {
    if (err) {
      console.log(err)
    }

    res.render('userlist', {
      title: '用户列表页',
      users: users
    })

  })
}

// signup
exports.signup = function(req, res) {
  var _user = req.body.user
  // var _user = req.params.userid
  // var _user = req.query.userid
  // req.param('user')
  console.log(_user)
  
  User.find({name: _user.name}, function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user && user.length > 0) {
      console.log('已存在user' + user.name)
      return res.redirect('/')
    } else {
      console.log('不存在user，创建:' + _user.name)
      var user = new User(_user)
      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }
        console.log('save')

        console.log(user)
        res.redirect('/')
      })
    }
  })
}

  // signin
exports.signin = function(req, res) {
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  console.log('signin')

  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log('err')
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }

      if (!user) {
        return res.redirect('/signup')
      }

      if (isMatch) {
        req.session.user = user
        console.log('Password is matched' + user)
        return res.redirect('/')
      } else {
        return res.redirect('signup')
        console.log('Password is not matched')
      }
    })
  })
}


// logout
exports.logout = function(req, res) {
  delete req.session.user
  // delete app.locals.user
  res.redirect('/')
}

// logout
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面'
  })
}

// logout
exports.showSignin = function(req, res) {
  console.log('signin')
  res.render('signin', {
    title: '登录页面'
  })
}


// midware for user
exports.signinRequired = function(req, res, next) {
  var user = req.session.user

  if (!user) {
    return res.redirect('/signin')
  }
  
  next()
}

// midware for admin
exports.adminRequired = function(req, res, next) {
  var user = req.session.user

  if (user.role <= 10) {
    return res.redirect('/signin')
  }
  
  next()
}


