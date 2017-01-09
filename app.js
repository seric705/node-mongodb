var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/node-mongodb')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('node-mongodb start on port ' + port)

// index page
app.get('/', function(req, res) {
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
})

// detail page
app.get('/movie/:id', function(req, res) {
  var id = req.params.id

  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'node-mongodb ' + movie.title,
      movie: movie
    })
  })
  // res.render('detail', {
  //   title: 'node-mongodb 详情页',
  //   movie: {
  //     doctor: '何塞.帕迪利亚',
  //     country: '美国',
  //     title: '机械战警',
  //     year: 2014,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg',
  //     language: '英语',
  //     flash: 'http://sucai.flashline.cn/flash4/yinyue/yxyg.swf',
  //     summary: '啊大家看到飞机卡减肥的空间卡的设计开发健康大数据反馈撒的减肥空间'
  //   }
  // })
})

// admin page
app.get('/admin/movie', function(req, res) {
  res.render('admin', {
    title: 'node-mongodb 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

// admin update movie
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id

  if (id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: 'node-mongodb 后台更新页',
        movie: movie
      })
    })
  }
})
// admin post movie
app.post('/admin/movie/new', function(req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err)
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err)
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      flash: movieObj.flash,
      summary: movieObj.summary
    })

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }

      res.redirect('/movie/' + movie._id)
    })
  }
})

// list page
app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err)
    }

    res.render('list', {
      title: 'node-mongodb 列表页',
      movies: movies
    })

  })
  // res.render('list', {
  //   title: 'node-mongodb 列表页',
  //   movies: [{
  //     _id: 1,
  //     doctor: '何塞.帕迪利亚',
  //     country: '美国',
  //     title: '机械战警',
  //     year: 2014,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg',
  //     language: '英语',
  //     flash: 'http://sucai.flashline.cn/flash4/yinyue/yxyg.swf',
  //     summary: '啊大家看到飞机卡减肥的空间卡的设计开发健康大数据反馈撒的减肥空间'  
  //   },{
  //     _id: 2,
  //     doctor: '何塞.帕迪利亚',
  //     country: '美国',
  //     title: '机械战警',
  //     year: 2014,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg',
  //     language: '英语',
  //     flash: 'http://sucai.flashline.cn/flash4/yinyue/yxyg.swf',
  //     summary: '啊大家看到飞机卡减肥的空间卡的设计开发健康大数据反馈撒的减肥空间'  
  //   },{
  //     _id: 3,
  //     doctor: '何塞.帕迪利亚',
  //     country: '美国',
  //     title: '机械战警',
  //     year: 2014,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg',
  //     language: '英语',
  //     flash: 'http://sucai.flashline.cn/flash4/yinyue/yxyg.swf',
  //     summary: '啊大家看到飞机卡减肥的空间卡的设计开发健康大数据反馈撒的减肥空间'  
  //   },{
  //     _id: 4,
  //     doctor: '何塞.帕迪利亚',
  //     country: '美国',
  //     title: '机械战警',
  //     year: 2014,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg',
  //     language: '英语',
  //     flash: 'http://sucai.flashline.cn/flash4/yinyue/yxyg.swf',
  //     summary: '啊大家看到飞机卡减肥的空间卡的设计开发健康大数据反馈撒的减肥空间'  
  //   },{
  //     _id: 5,
  //     doctor: '何塞.帕迪利亚',
  //     country: '美国',
  //     title: '机械战警',
  //     year: 2014,
  //     poster: 'http://b.hiphotos.baidu.com/exp/w=500/sign=af828be6aaaf2eddd4f149e9bd110102/35a85edf8db1cb1390dfc9f3db54564e93584b98.jpg',
  //     language: '英语',
  //     flash: 'http://sucai.flashline.cn/flash4/yinyue/yxyg.swf',
  //     summary: '啊大家看到飞机卡减肥的空间卡的设计开发健康大数据反馈撒的减肥空间'  
  //   },]
  // })
})
// list delete movie
app.delete('/admin/list', function(req, res) {
  var id = req.query.id
  if (id) {
    Movie.remove({_id: id}, function(err, movie) {
      if (err) {
        console.log(err)
      } else {
        res.json({success: 1})
      }
    })
  }
})
