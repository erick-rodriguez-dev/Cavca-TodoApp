export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key']
  const validApiKey = process.env.API_KEY

  if (!validApiKey) {
    console.error('ERROR: API_KEY no está configurada en las variables de entorno')
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'API key not configured on server'
    })
  }

  if (!apiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'API key is required. Please provide x-api-key header'
    })
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid API key'
    })
  }

  next()
}
