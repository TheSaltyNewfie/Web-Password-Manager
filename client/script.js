const username = document.querySelector("#username")
const password = document.querySelector("#password")
const loginButton = document.querySelector("#loginButton")
const createAccountButton = document.querySelector("#create-account")

const tokenEndpoint = "http://192.168.4.123:3000/token"
const userEndpoint = "http://192.168.4.123:3000/users"

async function login() {

    const res = await axios.post(tokenEndpoint, {
        Username: username.value,
        Password: password.value
    })

    const token = res.data.token

    console.log(token)
    localStorage.setItem("token", token)

    window.location.href = "http://192.168.4.123:5500/client/Main/index.html"
}

async function createUserDialog() {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'

    const card = document.createElement('div')
    card.id = 'card'
    card.className = 'dialog'
    card.innerHTML = `
        <input id="username-new" type="text" placeholder="Username" autocomplete="off">
        <input id="email-new" type="text" placeholder="Email" autocomplete="off">
        <input id="password-new" type="password" placeholder="Password" autocomplete="off">
        <button id="submit" class="password-card-button">Submit</button>
        <button id="cancel" class="password-card-button">Cancel</button>
    `

    document.body.appendChild(overlay)
    document.body.appendChild(card)

    const usernameNew = document.querySelector("#username-new")
    const emailNew = document.querySelector("#email-new")
    const passwordNew = document.querySelector("#password-new")
    const submit = document.querySelector("#submit")
    const cancel = document.querySelector("#cancel") 

    submit.addEventListener("click", async function () {
        const create = await axios.post(userEndpoint, {
            Username: usernameNew.value,
            PasswordHash: passwordNew.value,
            Email: emailNew.value
        })

        const login = await axios.post(tokenEndpoint, {
            Username: usernameNew.value,
            Password: passwordNew.value
        })

        localStorage.setItem("token", login.data.token)

        window.location.href = "http://192.168.4.123:5500/client/Main/index.html"
    })

    cancel.addEventListener("click", async function () {
        
    })
}

loginButton.addEventListener("click", async() => {login()})

createAccountButton.addEventListener("click", async() => {createUserDialog()})