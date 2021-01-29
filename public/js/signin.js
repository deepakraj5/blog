let signinForm = document.getElementById('signin-form')
let signinBtn = document.querySelector('.signin-btn')
let wrongEmail = document.querySelector('.wrong-email')
let wrongPassword = document.querySelector('.wrong-password')

let signinDetails = {}

signinBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    signinBtn.disabled = true
    signinBtn.innerHTML = 'Signing in...'

    let emailVal = false
    let passwordVal = false

    if (signinForm.elements[0].value !== '') {
        emailVal = true
        signinForm.elements[0].classList.remove('wrong-input')
    } else {
        signinForm.elements[0].classList.add('wrong-input')
    }
    if (signinForm.elements[1].value !== '') {
        passwordVal = true
        signinForm.elements[1].classList.remove('wrong-input')
    } else {
        signinForm.elements[1].classList.add('wrong-input')
    }

    if (emailVal && passwordVal) {
        
        for (let i = 0; i < 2; i ++) {
            let key = signinForm.elements[i].name
            let value = signinForm.elements[i].value
            signinDetails[key] = value
        }

        let response = await postMethod('http://localhost:3000/api/v1/signin', signinDetails)

        if (response.token) {

            localStorage.setItem('jwt_token', response.token)

            console.log(response.token)
            wrongEmail.innerHTML = ''
            wrongPassword.innerHTML = ''
        } else {
            signinForm.elements[0].classList.add('wrong-input')
            signinForm.elements[1].classList.add('wrong-input')
            wrongEmail.innerHTML = 'wrong credentials'
            wrongPassword.innerHTML = 'wrong credentials'
            signinBtn.disabled = false
            signinBtn.innerHTML = 'Signin'
        }

    } else {
        signinBtn.disabled = false
        signinBtn.innerHTML = 'Signin'
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