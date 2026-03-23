// const GET_MODELS_ENDPOINT = '/sentiment/get_models'
// const ANALYZE_ENDPOINT = '/sentiment/analyze'

// async function parseJsonResponse(response) {
//   const contentType = response.headers.get('content-type') || ''

//   if (!contentType.includes('application/json')) {
//     return null
//   }

//   return response.json()
// }

// async function request(endpoint, options = {}) {
//   const response = await fetch(endpoint, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options.headers || {}),
//     },
//     ...options,
//   })

//   const data = await parseJsonResponse(response)

//   if (!response.ok) {
//     const message = data?.message || 'Request failed. Please try again.'
//     throw new Error(message)
//   }

//   return data
// }

// export async function getSentimentModels() {
//   return request(GET_MODELS_ENDPOINT)
// }

// export async function analyzeSentiment(payload) {
//   return request(ANALYZE_ENDPOINT, {
//     method: 'POST',
//     body: JSON.stringify(payload),
//   })
// }


const API_BASE_URL = import.meta.env.VITE_API_URL || ''

const GET_MODELS_ENDPOINT = `${API_BASE_URL}/sentiment/get_models`
const ANALYZE_ENDPOINT = `${API_BASE_URL}/sentiment/analyze`

async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    return null
  }

  return response.json()
}

async function request(endpoint, options = {}) {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await parseJsonResponse(response)

  if (!response.ok) {
    const message = data?.message || 'Request failed. Please try again.'
    throw new Error(message)
  }

  return data
}

export async function getSentimentModels() {
  return request(GET_MODELS_ENDPOINT)
}

export async function analyzeSentiment(payload) {
  return request(ANALYZE_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}