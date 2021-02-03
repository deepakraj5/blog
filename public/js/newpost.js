let profile = JSON.parse(localStorage.getItem('profile'))

let hamburger = document.querySelector('.hamburger')
let navLink = document.querySelector('.nav-links')

hamburger.addEventListener('click', () => {
    navLink.classList.toggle('open')
})

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

            let blogPostData = CKEDITOR.replace('blog-post-data')
            let blogData
            blogPostData.on('change', (e) => {
                blogData = e.editor.getData()
            })

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

                postBlogBtn.innerHTML = 'Posting the Blog...'
                postBlogBtn.disabled = true

                let validation = false
                let titleCheck = blogForm.elements[0].value
                if(titleCheck.includes('-')) {
                    validation = false
                } else {
                    blogForm.elements[0].classList.remove('wrong-input')
                    validation = true
                }

                if(validation) {
                    let jwt_token = localStorage.getItem('jwt_token')

                    let title = blogForm.elements[0].value
                    let subject = blogForm.elements[1].value
                    let body = blogForm.elements[2].value

                    let blogImage = document.getElementById('blog-image')
                    let image = blogImage.files[0]

                    let formData = new FormData()

                    formData.append('image', image)
                    formData.append('title', title)
                    formData.append('subject', subject)
                    formData.append('blog', blogData)

                    let newPostMethod = async (url, token, data) => {
                        let response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + token
                            },
                            body: data
                        })
                    
                        return response.json()
                    }

                    let response = await newPostMethod('http://localhost:3000/api/v1/newpost', jwt_token, formData)

                    if (response.message === 'new post added') {
                        let titleError = document.getElementById('title-error')
                        titleError.innerHTML = ''
                        window.location.replace('http://localhost:3000')
                    } else if (response.error === 'title already present') {
                        let titleError = document.getElementById('title-error')
                        titleError.innerHTML = 'Title Already taken'
                        postBlogBtn.innerHTML = 'Post the Blog'
                        postBlogBtn.disabled = false
                    } else {
                        postBlogBtn.innerHTML = 'Post the Blog'
                        postBlogBtn.disabled = false
                    }
                } else {
                    blogForm.elements[0].classList.add('wrong-input')
                    postBlogBtn.innerHTML = 'Post the Blog'
                    postBlogBtn.disabled = false
                }
            })

        } 

        getProfile()
    }
}