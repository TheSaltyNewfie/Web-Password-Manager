const passwordArea = document.querySelector("#passwordArea")
const logoutButton = document.querySelector("#logout")
const addAccountButton = document.querySelector("#addAccount")
const deleteAllButton = document.querySelector("#deleteAll")
const accountButton = document.querySelector("#account")
const body = document.querySelector("body")

const TOKEN = localStorage.getItem('token')
const endpoint = "http://192.168.4.123:3000/accounts"
const userEndpoint = "http://192.168.4.123:3000/users"

console.log(TOKEN)

let passwords = {}

async function listAccounts() {
    let res = await axios.get(endpoint, {
        headers: {
            "Token": TOKEN,
        } 
    }).catch(function(error) {
        if(error.response.status == 401) {
            window.location.href = "http://192.168.4.123:5500/client/index.html"
        }
    })

    console.log(res)

    res.data.accounts.forEach(account => {
        passwordArea.innerHTML += `
            <div id="passwordInfo">
                <h2>${account.WebsiteName}</h2>
                <a href="${account.WebsiteURL}">URL</a>
                <p>Username: ${account.Username}</p>
                <p>Password: ${account.Password}</p>
                <p>ID: ${account._id}</p>
                <button id="deleteButton_${account._id}">Delete</button>
                <button id="editButton_${account._id}">Edit</button>
            </div>
        `

        passwords[account.WebsiteName] = account._id
    })

    // TODO: Move the for loop up into the forEach loop

    for(let key in passwords) {
        if(passwords.hasOwnProperty(key)) {
            console.log(passwords[key])

            const delBtn = document.querySelector(`#deleteButton_${passwords[key]}`)
            const editBtn = document.querySelector(`#editButton_${passwords[key]}`)

            delBtn.addEventListener("click", async function() {
                alert(`Hello from deleteButton_${passwords[key]}`)
                deletePassword(passwords[key])
            })

            editBtn.addEventListener("click", async function() {
                alert(`Hello from editButton_${passwords[key]}`)

                passwordArea.innerHTML = ""

                await listAccounts()
            })
        }
    }
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

    document.body.removeChild(card)
    document.body.removeChild(overlay)

    passwordArea.innerHTML = ""

    await listAccounts()
}

async function accountDialog() {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'

    const card = document.createElement('div')
    card.id = 'card'
    card.className = 'dialog'
    card.innerHTML = `
        <input id="websiteName" type="text" placeholder="Website Name" autocomplete="off">
        <input id="websiteURL" type="text" placeholder="Website URL" autocomplete="off">
        <input id="username" type="text" placeholder="Website Username" autocomplete="off">
        <input id="password" type="password" placeholder="Website Password" autocomplete="off">
        <button id="submit" class="password-card-button">Submit</button>
        <button id="cancel" class="password-card-button">Cancel</button>
    `

    document.body.appendChild(overlay)
    document.body.appendChild(card)

    const submit = document.querySelector("#submit")
    const cancel = document.querySelector("#cancel")

    submit.addEventListener("click", addAccount)
    cancel.addEventListener("click", async function() {
        document.body.removeChild(card)
        document.body.removeChild(overlay)
    })
}

async function deletePassword(id) {
    const res = await axios.delete(`${endpoint}/${id}`, {
        headers: {
            "Token": TOKEN
        }
    }).catch(function(error) {
        if(error.response.status == 401) {
            alert(`${error.response.error}`)
        }

        if(error.response.status == 500) {
            alert("Error 500")
        }
    })

    passwordArea.innerHTML = ""

    listAccounts()
}

async function deleteAll() {
    for(let key in passwords) {
        deletePassword(passwords[key])
        console.log(`Deleted: ${passwords[key]}`)
    }

    passwordArea.innerHTML = ""

    listAccounts()
}

async function deleteAllDialog() {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'

    const card = document.createElement('div')
    card.id = 'card'
    card.className = 'dialog'
    card.innerHTML = `
        <h1>Are you sure you want to delete all accounts?</h1>
        <button id="yes">Yes</button>
        <button id="no">No</button>
    `

    document.body.appendChild(overlay)
    document.body.appendChild(card)

    const yes = document.querySelector("#yes")
    const no = document.querySelector("#no")

    yes.addEventListener("click", async function() {
        await deleteAll()
        document.body.removeChild(card)
        document.body.removeChild(overlay)
    })
    no.addEventListener("click", async function() {
        document.body.removeChild(card)
        document.body.removeChild(overlay)
    })

}

async function accountDetails() {
    const res = await axios.get(userEndpoint, {
        headers: {
            Token: TOKEN
        }
    })

    const overlay = document.createElement('div')
    overlay.id = 'overlay'

    const card = document.createElement('div')
    card.id = 'card'
    card.className = 'dialog'
    card.innerHTML = `
        <h1>${res.data.Username}</h1>
        <p>${res.data.Email}</p>
        <button id="close-account-button">Close</button>
    `

    document.body.appendChild(overlay)
    document.body.appendChild(card)

    const close = document.querySelector("#close-account-button")

    close.addEventListener("click", async function() {
        document.body.removeChild(card)
        document.body.removeChild(overlay)
    })

}

function logout() {
    localStorage.removeItem('token')
    window.location.href = "http://192.168.4.123:5500/client/index.html"
}

document.addEventListener("DOMContentLoaded", listAccounts)

logoutButton.addEventListener("click", logout)

addAccountButton.addEventListener("click", accountDialog)

deleteAllButton.addEventListener("click", deleteAllDialog)

accountButton.addEventListener("click", accountDetails)