const BASE_URL = "http://localhost:5001/api/division"

import toast from 'react-hot-toast'

export async function CreateDivision(data) {
  try {
    console.log(BASE_URL)
    const response = await fetch(`${BASE_URL}/create-division`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw toast.error("Division alredy exists \n Please change this informations: \n Name \n Acronym")
    }
    return response.json()
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error // Re-throw the error to be handled by the caller
  }
}






