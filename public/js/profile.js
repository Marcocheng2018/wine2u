$(() => {
    // Getting user profile information
    $.get(`/api/user/details`).then(data => {
        data(e => {
            $("#my-detail").append(UserDetail(
                e.email,
                e.username,
                e.address,
                e.telephone,
            ))
        });
    });

    const UserDetail = (email, username, address, telephone) => {
        return `
            <form action="action/user/details" method="put" enctype="multipart/form-data">
                <div class="row">
                <label>Username:  </label>
                <input type="text" name="username" value="${username}" readonly/>
                </div>

                <div class="row">
                <label>Email:  </label>
                <input type="text" name="email" value="${email}" readonly/>
                </div>

                <div class="row">
                    <label>Telephone:  </label>
                    <input type="text" name="telephone" value="${telephone}" readonly/>
                </div>

                <div class="row">
                <label>Address:  </label>
                <input type="text" name="address" value="${address}" readonly/>
                </div>
            </form>`
    }

    //Edit the information of user
    $('#editBtn').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/user/details', {
                "username": $('#username').val(),
                "email": $('#email').val(),
                "telephone": $('#telephone').val(),
                "address": $('#address').val(),
            })
            .then(() => location.reload())
            .catch(err => console.log(err));
    })

    const SubscriptionDetail = (subscription) => {
        return `
        <div><h5 value="${subscription}"></h5></div>
        `
    }
});