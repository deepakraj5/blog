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
    window.location.replace('http://13.126.18.96:3005')
}
 
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
        signupForm.elements[0].classList.remove('wrong-input')
    } else {
        signupForm.elements[0].classList.add('wrong-input')
    }
    if (signupForm.elements[1].value !== '') {
        emailVal = true
        signupForm.elements[1].classList.remove('wrong-input')
    } else {
        signupForm.elements[1].classList.add('wrong-input')
    }
    if (signupForm.elements[2].value !== '') {
        phoneVal = true
        signupForm.elements[2].classList.remove('wrong-input')
    } else {
        signupForm.elements[2].classList.add('wrong-input')
    }
    if (signupForm.elements[3].value !== '') {
        passwordVal = true
        signupForm.elements[3].classList.remove('wrong-input')
    } else {
        signupForm.elements[3].classList.add('wrong-input')
    }

    if (nameVal && emailVal && phoneVal && passwordVal) {
        for (let i = 0; i < 4; i ++) {
            let key = signupForm.elements[i].name
            let value = signupForm.elements[i].value
            signupDetails[key] = value
        }
    
        let response = await postMethod('http://13.126.18.96:3005/api/v1/signup', signupDetails)
    
        if(response.message === 'user created') {
            window.location.replace('http://13.126.18.96:3005')
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