const passwordArea = document.querySelector("#passwordArea")

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

document.addEventListener("DOMContentLoaded", listAccounts)