'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')
const Redis = use('Redis')

Ws.channel('recharge', async ({ socket, auth }) => {
  console.log('%s joined with %s socket id', auth.user.username, socket.id)
  const cacheSocketId = await Redis.get(auth.user.username)
  if(!cacheSocketId || cacheSocketId != socket.id){
    await Redis.set(auth.user.username, socket.id)
  }
  socket.on('message', (data) => {
    console.log(data)
  })
}).middleware(['auth'])
