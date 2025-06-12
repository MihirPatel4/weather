import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/weather.html'))
})

app.get('/weather', async (req, res) => {
    const apiKey = process.env.API_KEY
    const q = req.query.q

    try {
        const apiRes = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=7`)
        const data = await apiRes.json()
        res.json(data)
    }
    catch (err) {
        console.error(`Error fetching data: ${err}`)
        res.status(500).json({error: 'Failed to fetch data from WeatherAPI'})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})