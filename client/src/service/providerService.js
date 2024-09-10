const BASE_URL = "http://localhost:5001/api/provider"

import toast from 'react-hot-toast'

export async function CreateProvider(data) {
  try {
    console.log(BASE_URL)
    const response = await fetch(`${BASE_URL}/create-provider`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw toast.error("Provider alredy exists \n Please change Tax Number")
    }
    return response.json()
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error // Re-throw the error to be handled by the caller
  }
}
