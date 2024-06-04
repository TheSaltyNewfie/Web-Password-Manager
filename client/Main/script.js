const passwordArea = document.querySelector("#passwordArea")


async function listAccounts() {
    const res = await axios.get('http://127.0.0.1:3000/accounts', {
        Token: localStorage.getItem("token")
    }).catch(function(error) {
        console.log(error)
    })

    console.log(res)

    passwordArea.innerHTML += `
        <div id="passwordInfo">
            <h1>${res.data.WebsiteName}</h1>
            <p>${res.data.WebsiteURL}</p>
            <p>Username: ${res.data.Username}</p>
            <p>Password: ${res.data.Password}</p>
            <button id="deleteButton">Delete</button>
            <button id="editButton">Edit</button>
        </div>
    `
}