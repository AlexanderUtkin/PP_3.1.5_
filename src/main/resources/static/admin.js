const urlAdmin = 'http://localhost:8080/api/users/'
const urlRoles = 'http://localhost:8080/api/users/roles/'

const adminInfo = document.getElementById('navbarBrandUser')
const usersTable = document.getElementById('usersTable')


function showCurrentAdmin() {
    fetch(urlAdmin)
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
    usersTable.innerHTML = result
    adminInfo.innerHTML = `<b><span>${user.username}</span></b>
                             <span>with roles:</span>
                             <span>${listRoles(user)}</span>`
}

showCurrentAdmin()
function getAllUsers() {
    fetch(urlAdmin)
        .then(function (response) {
            return response.json();
        })
        .then(function (users) {
            let dataOfUsers = '';
            let rolesString = '';

            const tableUsers = document.getElementById('tableUsers');

            for (let user of users) {

                rolesString = listRoles(user);

                dataOfUsers += `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.email}</td>
                        <td>${rolesString}</td>


                        <td>
                          <button type="button"
                          class="btn btn-info"
                          style="color:white"
                          data-bs-toogle="modal"
                          data-bs-target="#editModal"
                          onclick="editModal(${user.id})">
                                Edit
                            </button>
                        </td>


                        <td>
                            <button type="button"
                            class="btn btn-danger"
                            data-toggle="modal"
                            data-target="#deleteModal"
                            onclick="deleteModal(${user.id})">
                                Delete
                            </button>
                        </td>
                    </tr>`;
            }
            tableUsers.innerHTML = dataOfUsers;
        })
}

getAllUsers();

let deleteForm = document.forms["deleteForm"]

async function deleteModal(id) {
    const modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    await modal(deleteForm, modalDelete, id);
    loadRolesForDelete();
}
function deleteUser() {
    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault();
        fetch(urlAdmin + deleteForm.id.value, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            getAllUsers();
        });
    });
}

function loadRolesForDelete() {
    let selectDelete = document.getElementById("delete-role");
    selectDelete.innerHTML = "";

    fetch(urlRoles + deleteForm.id.value)
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.name.toString().replace('ROLE_', '');
                selectDelete.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

window.addEventListener("load", loadRolesForDelete);

deleteUser();

let editForm = document.forms["editForm"];

async function editModal(id) {
    const modalEdit = new bootstrap.Modal(document.querySelector('#editModal'));
    await modal(editForm, modalEdit, id);
    loadRolesForEdit();
}
function editUser() {
    editForm.addEventListener("submit", ev => {
        ev.preventDefault();

        let rolesForEdit = [];
        for (let i = 0; i < editForm.role.options.length; i++) {
            if (editForm.role.options[i].selected) rolesForEdit.push({
                id: editForm.role.options[i].value,
                name: "ROLE_" + editForm.role.options[i].text
            });
        }

        fetch(urlAdmin + editForm.id.value, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                username: editForm.username.value,
                name: editForm.name.value,
                surname: editForm.surname.value,
                email: editForm.email.value,
                password: editForm.password.value,
                role: rolesForEdit
            })
        }).then(() => {
            getAllUsers();
        });
    });
}
function loadRolesForEdit() {
    let selectEdit = document.getElementById("edit-role");
    selectEdit.innerHTML = "";

    fetch(urlRoles)
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.name.toString().replace('ROLE_', '');
                selectEdit.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

window.addEventListener("load", loadRolesForEdit);

editUser();

let newUserForm = document.forms["newUserForm"];

function createNewUser() {
    newUserForm.addEventListener("submit", ev => {
        ev.preventDefault();

        let rolesForNewUser = [];
        let options = document.querySelector('#newRoles').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected)
                rolesForNewUser.push({
                    id: options[i].value,
                    role: "ROLE_" + options[i].text
                });
        }

        fetch(urlAdmin, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('newName').value,
                surname: document.getElementById('newSurname').value,
                email: document.getElementById('newEmail').value,
                username: document.getElementById('newUsername').value,
                password: document.getElementById('newPassword').value,
                role: rolesForNewUser
            })
        })
            .then(() => {
            newUserForm.reset();
            getAllUsers();
        });
    });
}

function loadRolesForNewUser() {
    let selectAdd = document.getElementById("newRoles");

    selectAdd.innerHTML = "";

    fetch(urlRoles)
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.name.toString().replace('ROLE_', '');
                selectAdd.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

window.addEventListener("load", loadRolesForNewUser);

createNewUser();
async function getUserById(id) {

    try {
        let response = await fetch(urlAdmin + id);
        console.log(response);
        if (!response.ok) throw new Error('ошибка')
        return await response.json();
    } catch (ex) {
        console.log(ex.message);
    }
}

async function modal(form, modal, id) {
    modal.show();
    let user = await getUserById(id);
    console.log(user);
    form.id.value = user.id;
    console.log(form.id.value);
    form.username.value = user.username;
    form.name.value = user.name;
    form.surname.value = user.surname;
    form.email.value = user.email;
    form.role.value = user.role;
}

