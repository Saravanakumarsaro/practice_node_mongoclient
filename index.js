const express = require('express');
const datebase = require('./database');
const app = express();
const port = 2209;

app.use(express.json());

let initialCall = async () => {
  let result = await datebase.connection();
  if (result == 'success') {
    app.listen(port, () => {
      console.log(`This Application is listens to http://localhost:${port}`);
    });
  } else {
    console.log(result);
  }
};

app.post('/signup', async (req, res) => {
  let temp = await datebase.userDetailsInsert(req.body);
  res.send(temp);
});

app.post('/signin', async (req, res) => {
  let temp = await datebase.userDetailsLogin(req.body);
  res.send(temp);
});
app.post('/upadte', async (req, res) => {
  let temp = await datebase.userDetailsUpdate(req.body);
  res.send(temp);
});

//middleware function
// const welcome = (req, res, next) => {
//   console.log('Welcome');
//   next();
// };
// app.use(welcome);
// app.get('/middleware', welcome, (req, res) => {
//   res.send('Thank you');
// });

// app.post('*', (req, res) => {
//   res.send('404');
// });

initialCall();
