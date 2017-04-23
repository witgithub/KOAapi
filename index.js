const Koa = require('koa');
const Router = require('koa-router');
const  mongoose = require('mongoose');
const app = new Koa();
const router = new Router();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
mongoose.connect('mongodb://localhost/test');
// var MyModel = mongoose.model('users')


var userSchema = mongoose.Schema({
    name: String,
    surname: String,
    poionts: Number
});

var User = mongoose.model('User', userSchema);

var user = new User({ name: 'andrzej', surname:'kowalski', address: {
        city: 'poznan',
        street: 'glogowska',
        zipcode: '30-214',
    }, poionts: 15 });

//  user.save((err, user) => {
//   if (err) return console.error(err);
// //   fluffy.speak();
// });

// User.find(function (err, users) {
//   if (err) return console.error(err);
//   console.log(users);
// })

router.get('/dupaa', (ctx, next) => {ctx.body = "dupa"});
router.get('/', (ctx, next) => {ctx.body = "StarterRoute"});
// router.get('/:id', (ctx, next) => {ctx.body = ctx.params.id + ' to pedal;-)'});

 router.get('/users', async ctx => ctx.body = await User.find())
       .post('/users', async(ctx, next) => {
        console.log(ctx.request.body,'CTX');
        ctx.body = await new User(ctx.request.body).save();
      })
      .get('/users/:id', async (ctx, next) => ctx.body = await User.findById(ctx.params.id))
      .put('/users/:id', async (ctx, next) => ctx.body = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body))
      .delete('/users/:id', async (ctx, next) => {
                                            ctx.body = await User.findByIdAndRemove(ctx.params.id);
                                            ctx.status = 204;}
);

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);


