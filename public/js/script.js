let profile = JSON.parse(localStorage.getItem('profile'))

let signinLink = document.getElementById('signin')
let signupLink = document.getElementById('signup')
let aboutLink = document.getElementById('about')

if(profile) {
    signupLink.innerHTML = '<a id="signout" href="/signout">Signout</a>'
    signinLink.innerHTML = `<a href="/profile">${profile.name}</a>`
    aboutLink.innerHTML = '<a href="/addpost">Add Post</a>'
}

let getAllPost = async () => {

    let allPostMethod = async (url) => {
        let response = await fetch (url)
        return response.json()
    }

    let imageBlobCreater = (data) => {
        let arrayBufferView = new Uint8Array(data)
        let blob = new Blob([ arrayBufferView ], { type: 'image/jpeg' })
        let urlCreator = window.URL || window.webkitURL
        let imageUrl = urlCreator.createObjectURL(blob)
        return imageUrl
    }

    let postsResponse = await allPostMethod('http://localhost:3000/api/v1/allpost')
    let posts = postsResponse.posts

    for (let i = 0; i < posts.length; i ++) {
        let buf = posts[i].images

        let recentBlogs = document.querySelector('.recent-blogs')

        let blogList = document.createElement('div')
        blogList.classList.add('blog-list')

        recentBlogs.appendChild(blogList)

        let imageEle = document.createElement('img')
        let titleEle = document.createElement('h3')
        let subjectEle = document.createElement('p')

        imageEle.src = imageBlobCreater(buf.data)
        titleEle.innerHTML = posts[i].title
        subjectEle.innerHTML = posts[i].subject
        
        blogList.appendChild(imageEle)
        blogList.appendChild(titleEle)
        blogList.appendChild(subjectEle)

        let title = posts[i].title
        let searchOpt = title.split(' ').join('-')

        blogList.addEventListener('click', () => {
            window.location.replace('http://localhost:3000/blog/' + searchOpt)
        })
    }

    let preloader = document.querySelector('.preloader')
    preloader.classList.add('disappear')
}

getAllPost()

if(document.getElementById('signout')) {
    let signout = document.getElementById('signout')

    signout.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.removeItem('profile')
        localStorage.removeItem('jwt_token')
        window.location.replace('http://localhost:3000')
    })
}