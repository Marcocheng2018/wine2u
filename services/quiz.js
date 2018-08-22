class QuizService {

    constructor(knex) {
        this.knex = knex;
    }

    intakeQuizResult(req) {
        let currentUSer = req.session.passport.user;

    }

}