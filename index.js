import dotenv from 'dotenv'
dotenv.config()

import serverless from 'serverless-http'

/** FOR SLS */
import app from './src/app.js'
const handler = serverless(app)
export { handler }

/** FOR TESTING */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
