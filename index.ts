import { app } from './src/application/web'

const port = 3000

app.listen(port, () => {
    console.log(`gudang backend is listening on port ${port}`)
})