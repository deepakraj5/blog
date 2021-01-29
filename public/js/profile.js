let profile = JSON.parse(localStorage.getItem('profile'))

if (!profile) {
    window.location.replace('http://localhost:3000')
} else {
    let signinLink = document.getElementById('signin')
    let signupLink = document.getElementById('signup')
    let aboutLink = document.getElementById('about')

    if(profile) {
        signinLink.innerHTML = '<a href="/profile">Profile</a>'
        signupLink.innerHTML = '<a id="signout" href="/signout">Signout</a>'
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
}