var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ =require('underscore');
var Movie = require('./models/movie');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();

mongoose.connect('mongodb://localhost/imooc');

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.json());
//这里是静态文件
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);

console.log('项目启动start于端口'+port);

app.get('/',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('index',{
      title:'鼎力厂房网首页',
      movies: movies
    });
  });

});

//detail
app.get('/movie/:id',function(req,res){
  var id = req.params.id;
  Movie.findById(id,function(err,movie){
    res.render('detail',{
      title:'imooc' + movie.title,
      movie: movie
    });
  });

});

//admin page
app.get('/admin/movie',function(req,res){
  res.render('index',{
    title:'imooc 后台录入页',
    movie: {
      title: ' ',
      doctor: ' ',
      country: ' ',
      year: ' ',
      language: ' ',
      summary: ' ',
      poster: ' ',
      flash: ' '
    }
  });
});

//admin update
app.get('/admin/update/:id',function(){
  var id = req.params.id
  if(id){
    Movie.findById(id,function(){
      rea.render('admin',{
        title:'后台更新也',
        movie:movie
      })
    });
  }
});

//admin post movie
app.post('/admin/movie/new',function(){
  var id =req.body.movie._id;
  var movieObj = req.body.movie;

  if(id!=='undefined'){
    Movie.findById(id,function(){
      if(err){
        console.log(err);
      }
      _movie = _.extends(movie,movieObj);
      _movie.save(function(err,movie){
        if(err){
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      })
    });
  }else{
    _movie = new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary:movieObj.summary,
      flash:movieObj.flash
    });
    _movie.save(function(err,movie){
      if(err){
        console.log(err);
      }
      res.redirect('/movie/' + movie._id);
    });

  }
});

//list page
app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list',{
      title:'鼎力厂房网首页',
      movies: movies
    });
  });
});