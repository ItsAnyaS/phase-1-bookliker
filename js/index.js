const list = document.querySelector('#list')
const displayArea = document.querySelector('#show-panel')

let currentUser = {
    username: 'justAnotherUser'
}

const getBooks = async () => {
let req = await fetch('http://localhost:3000/books')
let res = await req.json()
return res
}

const addBookToList = async (element, content) => {
    let li = document.createElement('li')
     li.innerText = content
     li.addEventListener('click', () => {
        showBookDetails(element)
     })
    list.append(li)

}
const populateBookList = async (arr) => {
    let result  = await arr
   await result.forEach(async(element) => {
      await  addBookToList(element, element.title)
    });
}

const showBookDetails = (bookObj) => {
    let bookTitle = document.createElement('h2')
    bookTitle.innerText = bookObj.title
    let bookImg = document.createElement('img')
    bookImg.src = bookObj['img_url']
    let bookDesc = document.createElement('p')
    bookDesc.innerText = bookObj.description
    let bookUserList = document.createElement('ul')
    let users = bookObj.users   
    users.forEach((user) => {
        let li = document.createElement('li')
        li.textContent = user.username
        bookUserList.append(li)
    })
    let likeBtn = document.createElement('button')
    likeBtn.textContent = 'Like'

    likeBtn.addEventListener('click', () => {
        updateUserlikes(bookObj, currentUser)
    })
displayArea.append(bookTitle, bookImg, bookDesc, bookUserList, likeBtn)//, bookUserList
}

const updateUserlikes = async(bookObj, currentUser) => {
    let userArr = bookObj.users
    userArr.push(currentUser)
    req = await fetch(`http://localhost:3000/books/${bookObj.id}`, {
        method: "PATCH",
        headers: { 'content-type': 'application/json'},
        body:JSON.stringify({users: userArr})
    })
}

populateBookList(getBooks())

