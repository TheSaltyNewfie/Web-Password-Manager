const passwordArea = document.querySelector("#passwordArea")
const logoutButton = document.querySelector("#logout")
const addPasswordButton = document.querySelector("#addPassword")

const TOKEN = localStorage.getItem('token')
const endpoint = "http://127.0.0.1:3000/accounts"

console.log(TOKEN)

async function listAccounts() {
    let res = await axios.get(endpoint, {
        headers: {
            "Token": TOKEN,
        } 
    }).catch(function(error) {
        if(error.response.status == 401) {
            window.location.href = "http://127.0.0.1:5500/client/index.html"
        }
    })

    console.log(res)

    res.data.accounts.forEach(account => {
        passwordArea.innerHTML += `
            <div id="passwordInfo">
                <h1>${account.WebsiteName}</h1>
                <a href="${account.WebsiteURL}">${account.WebsiteURL}</a>
                <p>Username: ${account.Username}</p>
                <p>Password: ${account.Password}</p>
                <button id="deleteButton">Delete</button>
                <button id="editButton">Edit</button>
            </div>
        `
    })
}

async function addAccount() {
    let websiteName = document.querySelector("#websiteName").value
    let websiteURL = document.querySelector("#websiteURL").value
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value

    let res = await axios.post(endpoint, {
        Token: TOKEN,
        WebsiteName: websiteName,
        WebsiteURL: websiteURL,
        Username: username,
        Password: password
    })

    console.log(res)
}

function logout() {
    localStorage.removeItem('token')
    window.location.href = "http://127.0.0.1:5500/client/index.html"
}

document.addEventListener("DOMContentLoaded", listAccounts)

logoutButton.addEventListener("click", logout)