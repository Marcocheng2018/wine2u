const bcrypt = require('../utils/bcrypt.js');

class userService {

    constructor(knex) {
        this.knex = knex;
    }

    updateUser(id, username, email, telephone, address) {
        let updatePromises = [];

        if (username) {
            let updateName = this.knex('users').where('id', id).update('username', username);
            updatePromises.push(updateName)
        }

        if (email) {
            let select = this.knex('users').column(["email"]).where('email', email)
                .then((result) => {
                    if (result == 0) {
                        return this.knex('users').where('id', id).update('email', email)
                    } else {
                        return Promise.reject();
                    }
                })
            updatePromises.push(select)
        }
        return Promise.all(updatePromises)
            .then(() => {
                console.log(updatePromises)
            })
            .catch((err) => console.log(err))
    }

    addUser(email, password) {

        let query = this.knex
            .select('email')
            .from('user')
            .where('user.email', email);

        return query.then((rows) => {
            if (rows.length !== 1) {
                return this.knex('user')
                    .insert({
                        email: email,
                        password: password
                    })
            } else {
                throw new Error('Email already registered');
            }
        })
    }


}

module.exports = userService;