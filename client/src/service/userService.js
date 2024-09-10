const BASE_URL = "http://localhost:5001/api/user"

import toast from 'react-hot-toast'

export async function CreateUser(data) {
  try {
    console.log(BASE_URL)
    const response = await fetch(`${BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {     
      throw toast.error("User alredy exists \n Please change this informations : \n Registration Number \n Email")
      //throw new Error(` ${JSON.stringify(response.json())}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error // Re-throw the error to be handled by the caller
  }
}

/*export async function createUser(data, url) {
  /*try {
    console.log(BASE_URL)
    const response = await fetch(`http://localhost:4003/v1/api/admin/user-admin/create`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      return response.json()
    } catch (error) {
      console.error('Error creating user:', error)
      throw error // Re-throw the error to be handled by the caller
    }
   //////////
    const response = await  fetch('http://localhost:4003/v1/api/admin/user-admin/create', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )
      .then(response => {
        if (!response.ok) {
          // If response is not OK, throw an error with the status text
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      })
}*/






