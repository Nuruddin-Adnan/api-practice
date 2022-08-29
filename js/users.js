const loadUsers = async () => {
    const url = 'https://randomuser.me/api/?results=50';
    try {
        const res = await fetch(url);
        const data = await res.json();
        showUsersData(data.results);
    }
    catch (error) {
        console.log(error);
    }
}

loadUsers();

const showUsersData = users => {
    const usersDiv = document.getElementById('users-container');
    users.forEach((user, index) => {
        if (index >= 50) {
            return;
        }
        const tr = document.createElement('tr');
        tr.classList.add('shadow-sm', 'rounded-3', 'overflow-hidden', 'bg-white');
        tr.innerHTML = `
        <td class="d-flex align-items-center">
            <div class="flex-shrink-0 me-2">
                <img src="${user.picture.large}" alt="profile-img" class="img-fluid rounded-pill" width="50px" height="50px">
            </div>
            <div>
                <h6 class="mb-0">${user.name.title} ${user.name.first} ${user.name.last}</h6>
                <small class="text-muted">${user.login.username}</small>
            </div>
        </td>
        <td>${user.email}</td>
        <td>${user.cell}</td>
        <td>${user.location.country}</td>
        <td><button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#userDetails" onclick="loadUsersDetails('https://randomuser.me/api/?id=${user.id.value}');">See Details</button></td>
        `
        // console.log(user);
        usersDiv.appendChild(tr);
    });
}


const loadUsersDetails = async (url) => {
    const userDetailsContainer = document.getElementById('dynamic-user-details');
    userDetailsContainer.innerHTML = '';
    try {
        const res = await fetch(url);
        const data = await res.json();
        showUsersDetails(data.results[0]);
    }
    catch (error) {
        console.log(error);
    }


}

const showUsersDetails = (userDetails) => {
    document.getElementById('dynamic-user-details').innerHTML = `
    <div class="modal-header justify-content-center">
        <h5 class="modal-title" id="userDetailsLabel">${userDetails.name.title} ${userDetails.name.first} ${userDetails.name.last}</h5>
    </div>
    <div class="modal-body">
        <div class="text-center">
            <img src="${userDetails.picture.large}" alt=" profile-img" class="img-fluid rounded-pill" width="100px" height="100px">
            <ul class="py-3 text-start">
                <li>Email: ${userDetails.email}</li>
                <li> ${userDetails.location?.street?.number ?? ''},  ${userDetails.location?.street?.name ?? ''} </li>
                <li>${userDetails.location.city}, ${userDetails.location.country}</li>
                <li>Postal Code: ${userDetails.location.postcode}</li>
            </ul>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `
    console.log(userDetails);
}