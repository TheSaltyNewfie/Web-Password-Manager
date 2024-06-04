const username = document.querySelector("#username")
const password = document.querySelector("#password")
const loginButton = document.querySelector("#loginButton")

const tokenEndpoint = "http://192.168.4.123:3000/token"

async function login() {

    const res = await axios.post(tokenEndpoint, {
        username: username.value,
        password: password.value
    })

    const token = res.data.token

    console.log(token)
    localStorage.setItem("token", token)

    //window.location.href = "http://127.0.0.1:5500/client/Main"
}

loginButton.addEventListener("click", async() => {login()})