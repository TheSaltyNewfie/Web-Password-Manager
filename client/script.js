const username = document.querySelector("#username")
const password = document.querySelector("#password")
const loginButton = document.querySelector("#loginButton")

const tokenEndpoint = "http://127.0.0.1:3000/token"

async function login() {

    const res = await axios.post(tokenEndpoint, {
        Username: username.value,
        Password: password.value
    })

    const token = res.data.token

    console.log(token)
    localStorage.setItem("token", token)

    window.location.href = "http://127.0.0.1:5500/client/Main/index.html"
}

loginButton.addEventListener("click", async() => {login()})