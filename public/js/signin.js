let preloader = document.querySelector('.preloader')

let hamburger = document.querySelector('.hamburger')
let navLink = document.querySelector('.nav-links')

hamburger.addEventListener('click', () => {
    navLink.classList.toggle('open')
})

window.addEventListener('load', handleOnLoad)

function handleOnLoad () {
    preloader.classList.add('disappear')
}

let profile = JSON.parse(localStorage.getItem('profile'))

if (profile) {
    console.log(profile)
    window.location.replace('https://blog.deepakdev.live')
}

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

    try {
        if (emailVal && passwordVal) {
        
            for (let i = 0; i < 2; i ++) {
                let key = signinForm.elements[i].name
                let value = signinForm.elements[i].value
                signinDetails[key] = value
            }
    
            let response = await postMethod('https://blog.deepakdev.live/api/v1/signin', signinDetails)
    
            if (response.token) {
    
                localStorage.setItem('jwt_token', response.token)
                wrongEmail.innerHTML = ''
                wrongPassword.innerHTML = ''
    
                let profile = await profileMethod('https://blog.deepakdev.live/api/v1/profile', response.token)
                
                localStorage.setItem('profile', JSON.stringify(profile.profile))

                window.location.replace('https://blog.deepakdev.live')
    
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
    } catch (e) {
        
    }
})

let postMethod = async (url = '', data = {}) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        return response.json()
    } catch (e) {
        
    }
}

let profileMethod = async (url, token) => {
    let response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return response.json()
}