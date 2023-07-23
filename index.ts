import { app } from './src/utils/web'
import dotenv from 'dotenv'

dotenv.config()
const port = 3000

app.listen(port, () => {
    console.log(`gudang backend is listening on port ${port}`)
})