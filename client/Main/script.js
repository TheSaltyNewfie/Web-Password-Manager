const passwordArea = document.querySelector("#passwordArea")
const logoutButton = document.querySelector("#logout")
const addAccountButton = document.querySelector("#addAccount")
const deleteAllButton = document.querySelector("#deleteAll")
const body = document.querySelector("body")

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

    document.body.removeChild(card);
    document.body.removeChild(overlay);

    passwordArea.innerHTML = ""

    await listAccounts()
}

async function accountDialog() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const card = document.createElement('div');
    card.id = 'card';
    card.className = 'dialog';
    card.innerHTML = `
        <input id="websiteName" type="text" placeholder="Website Name" autocomplete="off">
        <input id="websiteURL" type="text" placeholder="Website URL" autocomplete="off">
        <input id="username" type="text" placeholder="Website Username" autocomplete="off">
        <input id="password" type="password" placeholder="Website Password" autocomplete="off">
        <button id="submit" class="password-card-button">Submit</button>
        <button id="cancel" class="password-card-button">Cancel</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(card);

    const submit = document.querySelector("#submit")
    const cancel = document.querySelector("#cancel")

    submit.addEventListener("click", addAccount)
    cancel.addEventListener("click", async function() {
        document.body.removeChild(card);
        document.body.removeChild(overlay);
    })
}

async function deleteAll() {
    // TODO: Implement deleteAll
}

async function deleteAllDialog() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const card = document.createElement('div');
    card.id = 'card';
    card.className = 'dialog';
    card.innerHTML = `
        <h1>Are you sure you want to delete all accounts?</h1>
        <button id="yes">Yes</button>
        <button id="no">No</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(card);

    const yes = document.querySelector("#yes")
    const no = document.querySelector("#no")

    yes.addEventListener("click", deleteAll)
    no.addEventListener("click", async function() {
        document.body.removeChild(card);
        document.body.removeChild(overlay);
    })

}

function logout() {
    localStorage.removeItem('token')
    window.location.href = "http://127.0.0.1:5500/client/index.html"
}

document.addEventListener("DOMContentLoaded", listAccounts)

logoutButton.addEventListener("click", logout)

addAccountButton.addEventListener("click", accountDialog)

deleteAllButton.addEventListener("click", deleteAllDialog)