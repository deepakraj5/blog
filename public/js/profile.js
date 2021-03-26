let profile = JSON.parse(localStorage.getItem('profile'))

let hamburger = document.querySelector('.hamburger')
let navLink = document.querySelector('.nav-links')

hamburger.addEventListener('click', () => {
    navLink.classList.toggle('open')
})

if (!profile) {
    window.location.replace('http://34.72.18.223:3008')
} else {
    let signinLink = document.getElementById('signin')
    let signupLink = document.getElementById('signup')
    let aboutLink = document.getElementById('about')

    if(profile) {

        let profileMethod = async (url, token) => {
            let response = await fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
        
            return response.json()
        }

        let jwt_token = localStorage.getItem('jwt_token')

        async function getProfile () {
            let profileRes = await profileMethod('http://34.72.18.223:3008/api/v1/profile', jwt_token)
            signupLink.innerHTML = '<a id="signout" href="/signout">Signout</a>'
            signinLink.innerHTML = `<a href="/profile">${profileRes.profile.name}</a>`
            aboutLink.innerHTML = '<a href="/addpost">Add Post</a>'

            let name = document.getElementById('name')
            let email = document.getElementById('email')
            let phone = document.getElementById('phone')

            name.innerHTML = `Name: ${profileRes.profile.name}`
            email.innerHTML = `Email: ${profileRes.profile.email}`
            phone.innerHTML = `Phone: ${profileRes.profile.phone}`

            let preloader = document.querySelector('.preloader')

            if(profileRes) {
                handleOnLoad()
            }

            function handleOnLoad () {
                preloader.classList.add('disappear')
            }

            if(document.getElementById('signout')) {
                let signout = document.getElementById('signout')
        
                signout.addEventListener('click', (e) => {
                    e.preventDefault()
        
                    localStorage.removeItem('profile')
                    localStorage.removeItem('jwt_token')
                    window.location.replace('http://34.72.18.223:3008')
                })
            }
        } 

        getProfile()

    }
}