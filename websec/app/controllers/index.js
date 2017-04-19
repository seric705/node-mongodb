var Movie = require('../models/movie')
  
// index page
exports.index = function(req, res) {
  console.log('user in session:')
  console.log(req.session.user)

  // var _user = req.session.user
  // if (_user) {
  //   app.locals.user = _user
  // }
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err)
    }

    res.render('index', {
      title: 'node-mongodb 首页',
      movies: movies
    })

  })
  // res.render('index', {
  //   title: 'node-mongodb 首页',
  //   movies: [{
  //     title: '机械战警',
  //     _id: 1,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg'
  //   },{
  //     title: '机械战警',
  //     _id: 2,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg'
  //   },{
  //     title: '机械战警',
  //     _id: 3,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg'
  //   },{
  //     title: '机械战警',
  //     _id: 4,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg'
  //   },{
  //     title: '机械战警',
  //     _id: 5,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg'
  //   },{
  //     title: '机械战警',
  //     _id: 6,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg'
  //   }]
  // })
}
