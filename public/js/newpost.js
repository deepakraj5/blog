let profile = JSON.parse(localStorage.getItem('profile'))

if (!profile) {
    window.location.replace('http://localhost:3000')
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
            let profileRes = await profileMethod('http://localhost:3000/api/v1/profile', jwt_token)
            signupLink.innerHTML = '<a id="signout" href="/signout">Signout</a>'
            signinLink.innerHTML = `<a href="/profile">${profileRes.profile.name}</a>`
            aboutLink.innerHTML = '<a href="/addpost">Add Post</a>'

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
                    window.location.replace('http://localhost:3000')
                })
            }


            let blogForm = document.querySelector('.blog-form')
            let postBlogBtn = document.querySelector('.post-blog-btn')

            postBlogBtn.addEventListener('click', async (e) => {
                e.preventDefault()

                console.log(blogForm.elements[0].value)
                console.log(blogForm.elements[1].value)
                console.log(blogForm.elements[2].value)
                console.log(blogForm.elements[3].value)

                let blogImage = document.getElementById('blog-image')
                console.log(blogImage.files[0])

            })

        } 

        getProfile()
    }
}