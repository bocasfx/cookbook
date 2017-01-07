const errorHandler = (err, res)=> {
  console.log(err);
  res.status(500).send('Whoops!');
};

module.exports = errorHandler;
