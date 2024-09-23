// My accounts recovery key: v0R0cqZeQBzLEB8XimVKUw
const { Storage } = require('megajs')
const storage = new Storage({
  email: 'parv141206@gmail.com',
  password: 'this_is_temp_bozo',
})
storage.ready.then(() => {
  console.log('[mega-storage] Connected')
})
module.exports = storage
