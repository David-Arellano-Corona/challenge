const db = require('../../db');

function Save(url, query){
  return new Promise((resolve, reject) => {
      const sql = "insert into tb_historical(cl_url, cl_query) values(?,?)";
      db.get().query(sql,[url, query], (err, res) => {
          if(err) return reject(err);
          return resolve(res);
      })
  })  
}

function Find(){
    return new Promise((resolve, reject) => {
        const sql = "select cl_url as url, cl_query as query, date_format(cl_createAt,'%Y-%m-%d') as date from tb_historical";
        db.get().query(sql,(err, res) => {
            if(err) return reject(err);
            return resolve(res);
        })
    })
}

function FindLast(path){
    return new Promise((resolve, reject) => {
        const sql = "select cl_query as query from tb_historical where cl_url = ? order by cl_createAt desc limit 1";
        db.get().query(sql,[path], (err, res) => {
            if(err) return reject(err);
            return resolve(res);
        })
    })
}

module.exports = {
    Save,
    Find,
    FindLast
}