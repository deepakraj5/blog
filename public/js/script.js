let preloader = document.querySelector('.preloader')

window.addEventListener('load', handleOnLoad)

function handleOnLoad () {
    preloader.classList.add('disappear')
}

let profile = JSON.parse(localStorage.getItem('profile'))

let signinLink = document.getElementById('signin')
let signupLink = document.getElementById('signup')
let aboutLink = document.getElementById('about')

if(profile) {
    signupLink.innerHTML = '<a id="signout" href="/signout">Signout</a>'
    signinLink.innerHTML = `<a href="/profile">${profile.name}</a>`
    aboutLink.innerHTML = '<a href="/addpost">Add Post</a>'
}

if(document.getElementById('signout')) {
    let signout = document.getElementById('signout')

    signout.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.removeItem('profile')
        localStorage.removeItem('jwt_token')
        window.location.replace('http://localhost:3000')
    })
}