// LOAD ENVIRONMENT FIRST
import dotenv from 'dotenv'
dotenv.config()

import { app } from './src/utils/web'

const port = 3000

app.listen(port, () => {
    console.log(`gudang backend is listening on port ${port}`)
})