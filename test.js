const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('token')
  }, 1000)
})

console.log('started', new Date().getSeconds())

;(async () => {
  const data = await p
  console.log(data, new Date().getSeconds())
})()
