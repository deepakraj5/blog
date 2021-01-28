let signupBtn = document.querySelector('.signup-btn')
let signupForm = document.getElementById('signup-form')

let signupDetails = {}

signupBtn.addEventListener('click', async (e) => {

    e.preventDefault()

    signupBtn.disabled = true
    signupBtn.innerHTML = 'Signing up...'

    let nameVal = false
    let emailVal = false
    let phoneVal = false
    let passwordVal = false

    if (signupForm.elements[0].value !== '') {
        nameVal = true
    }
    if (signupForm.elements[1].value !== '') {
        emailVal = true
    }
    if (signupForm.elements[2].value !== '') {
        phoneVal = true
    }
    if (signupForm.elements[3].value !== '') {
        passwordVal = true
    }

    console.log(nameVal, emailVal, phoneVal, passwordVal)

    if (nameVal && emailVal && phoneVal && passwordVal) {
        for (let i = 0; i < 4; i ++) {
            let key = signupForm.elements[i].name
            let value = signupForm.elements[i].value
            signupDetails[key] = value
        }
    
        let response = await postMethod('http://localhost:3000/api/v1/signup', signupDetails)
    
        if(response.message === 'user created') {
            window.location.replace('http://localhost:3000')
        } else {
            signupBtn.disabled = false
            signupBtn.innerHTML = 'Signup'
        }
    } else {
        signupBtn.disabled = false
        signupBtn.innerHTML = 'Signup'
    }
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