var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

const Book = require('../models/bookModel');

function readBooks(){
    const result = [];
    const data = fs.readFileSync(path.join(__dirname,'../books.txt')).toString();
    console.log(data);
    const lines = data.split('\n');
    lines.forEach((item)=>{
        const attribute = item.split('-');
        const b = new Book(attribute[0],
            attribute[1],
            attribute[2],
            attribute[3],
            attribute[4]);
            result.push(b);
    })
    return result;
}

router.get('/', function(req, res, next) {
    const data = readBooks();
    console.log(data);
  res.json({status:'success',result:data});
});

router.get('/:id', function(req, res, next) {
    const data = readBooks();
    for(let i = 0; i<data.length;i++){
        if(data[i].id == req.params.id){
            res.json({status:'success',result:data[i]});
            return;
        }
    }
    res.json({})
  });

  router.post('/', function(req, res, next) {
    const writeStream = fs.createWriteStream(path.join(__dirname,"../books.txt"),{
        flags:"a"
      });
      const user = req.body;
      writeStream.write('\n');
    writeStream.write(user.id + '-' + user.title + '-'+ user.ISBN+'-'+user.publishDate + '-' + user.author);
      res.json({status:"sucess"});
  });

  router.delete('/:id',(req,res)=>{
    let output = readBooks();
    const index = output.map((item)=>item.id).indexOf(req.params.id);
    if(index!==-1){
      const result = output.filter((item)=>{
        return item.id!==req.params.id;
      });
      let writeStream = fs.createWriteStream(path.join(__dirname,"../books.txt"));
      result.forEach((item)=>{
        writeStream.write(item.id+'-'+item.title+'-'+item.ISBN+'-'+item.publishDate+'-'+item.author);
        writeStream.write('\n');
      })
      writeStream.end();
      res.json({status:"sucess"})
    }
    res.json({status:"not found"})
  });

  router.put('/:id',(req,res)=>{
    let output = readBooks();
    const index = output.map((item)=>item.id).indexOf(req.params.id);
    if(index!==-1){
      output[index]={
        id:req.body.id,
        title: req.body.title,
        ISBN: req.body.ISBN,
        publishDate: req.body.publishDate,
        author:req.body.author
      }
      const writeStream = fs.createWriteStream(path.join(__dirname,"../books.txt"));
      output.forEach((item)=>{
        writeStream.write(item.id + '-' + item.title+'-'+item.ISBN+'-'+item.publishDate+'-'+item.author);
        writeStream.write('\n');
      })
      writeStream.end();
      res.json({status:"user updated"});
      return;
    }
    res.json({status:"sucess",message:"user not found"})
    })
module.exports = router;