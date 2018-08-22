exports.up = function(knex, Promise) {
    return knex.schema.createTable('banner', (banner) => {
        banner.increments();
        banner.integer("homepage");
        banner.string("productpage");
        banner.timestamps(false, true);
    }).then(() => {
        return knex.schema.createTable('users', (users) => {
            users.increments();
            users.string("username");
            users.integer("userid");
            users.string("facebookid");
            users.string("email");
            users.integer("telephone");
            users.string("password");
            users.string("address");
            users.timestamps(false, true);
        });
    }).then(() => {
        return knex.schema.createTable('wines', (wines) => {
            wines.increments();
            wines.string("winename");
            wines.string("grape");
            wines.string("taste");
            wines.string("country");
            wines.string("place");
            wines.integer("year");
            wines.decimal("price");
            wines.integer("photoid");
            wines.integer("quantity");
            wines.timestamps(false, true);
        });
    }).then(() => {
        return knex.schema.createTable('quiz', (quiz) => {
            quiz.increments();
            quiz.integer('userid').unsigned().unique();
            quiz.foreign('userid').references('users.id');
            quiz.integer('q1');
            quiz.integer('q2');
            quiz.integer('q3');
            quiz.integer('q4');
            quiz.integer('q5');
            quiz.integer('r1').unsigned().unique();
            quiz.foreign('r1').references('wines.id');
            quiz.integer('r2').unsigned().unique();
            quiz.foreign('r2').references('wines.id');
            quiz.integer('r3').unsigned().unique();
            quiz.foreign('r3').references('wines.id');
            quiz.integer('r4').unsigned().unique();
            quiz.foreign('r4').references('wines.id');
            quiz.timestamps(false, true);
        });
    }).then(() => {
        return knex.schema.createTable('order', (order) => {
            order.increments();
            order.integer('facebookid');
            order.integer('subscription');
            order.date('orderdate');
            order.string('txid');
            order.integer('pricesub');
            order.integer('quizid').unsigned().unique();
            order.foreign('quizid').references('quiz.id');
            order.timestamps(false, true);
        });
    });
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('order')
        .then(() => {
            return knex.schema.dropTable('quiz')
        }).then(() => {
            return knex.schema.dropTable('wines')
        }).then(() => {
            return knex.schema.dropTable('users')
        }).then(() => {
            return knex.schema.dropTable('banner')
        })
}