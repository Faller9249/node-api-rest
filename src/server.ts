import { app } from './app.js'
import { env } from './env/index.js'

app.listen({
  host: '0.0.0.0', // Render precisa disso
  port: env.PORT
}).then(() => {
  console.log(`🚀 HTTP Server Running on port ${env.PORT}`)
})
