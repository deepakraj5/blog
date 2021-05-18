let profile = JSON.parse(localStorage.getItem('profile'))

let hamburger = document.querySelector('.hamburger')
let navLink = document.querySelector('.nav-links')

hamburger.addEventListener('click', () => {
    navLink.classList.toggle('open')
})

let signinLink = document.getElementById('signin')
let signupLink = document.getElementById('signup')
let aboutLink = document.getElementById('about')

if(profile) {
    signupLink.innerHTML = '<a id="signout" href="/signout">Signout</a>'
    signinLink.innerHTML = `<a href="/profile">${profile.name}</a>`
    aboutLink.innerHTML = '<a href="/addpost">Add Post</a>'
}

let start = async () => {

    let loc = window.location.pathname
    let idArray = loc.split('/')
    let blogId = idArray[2]

    let imageBlobCreater = (data) => {
        let imageBufferView = new Uint8Array(data)
        let blob = new Blob([ imageBufferView ], { type: 'image/jpeg '})
        let imageUrlCreater = window.URL || window.webkitURL
        let imageUrl = imageUrlCreater.createObjectURL(blob)
        return imageUrl
    }

    let getSinglePostMethod = async (url, blogId) =>{
        let response = await fetch (url + `/${blogId}`)
        return response.json()
    }

    let youtubeLinkCreater = (data) => {
        return `https://www.youtube.com/embed/${data}`
    }

    let blogObj = await getSinglePostMethod('https://blog.deepakdev.live/api/v1/singlepost', blogId)
    let blog = blogObj.post

    let blogImage = document.getElementById('blog-img')
    let blogTitle = document.getElementById('blog-title')
    let blogSubject = document.getElementById('blog-subject')
    let blogBody = document.getElementById('blog-body')

    blogTitle.innerHTML = blog.title
    blogSubject.innerHTML = blog.subject
    blogBody.innerHTML = blog.blog
    blogImage.src = imageBlobCreater(blog.images.data)

    let preloader = document.querySelector('.preloader')
    preloader.classList.add('disappear')

}

start()

if(document.getElementById('signout')) {
    let signout = document.getElementById('signout')

    signout.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.removeItem('profile')
        localStorage.removeItem('jwt_token')
        window.location.replace('https://blog.deepakdev.live')
    })
}