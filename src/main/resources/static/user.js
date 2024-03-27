const urlUser = 'http://localhost:8080/api/user/'
const navbarBrandUser = document.getElementById('navbarBrandUser');
const tableAuthUser = document.getElementById('tableAuthUser');

function showCurrentUser() {
    fetch(urlUser)
        .then((response) => response.json())
        .then((data) => {
            showUserInfo(data)
        }).catch((ex) => console.error(ex))
}

function showUserInfo(user) {
    let result = ''
    result += `
         <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.email}</td>                      
                       <td>${listRoles(user)}</td>
                        </tr>`
    tableAuthUser.innerHTML = result
    navbarBrandUser.innerHTML = `<b><span>${user.username}</span></b>
                             <span>with roles:</span>
                             <span>${listRoles(user)}</span>`

}
function listRoles(user) {
    let roles = "";
    for (let i = 0; i < user.role.length; i++) {
        roles += " " + user.role[i].name.substring(5)
    }

    return roles;
}

showCurrentUser()