let signupBtn = document.querySelector('.signup-btn')
let signupForm = document.getElementById('signup-form')

let signupDetails = {}

signupBtn.addEventListener('click', async (e) => {

    e.preventDefault()

    for (let i = 0; i < 4; i ++) {
        let key = signupForm.elements[i].name
        let value = signupForm.elements[i].value
        signupDetails[key] = value
    }

    let response = await postMethod('http://localhost:3000/api/v1/signup', signupDetails)
    
    console.log(response)
})

let postMethod = async (url, data) => {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}