const express = require("express");
const passport = require('passport');
// const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter {

    router(knex) {
        let router = express.Router();

        //error handle
        router.use(function(err, req, res, next) {
            res.status(500).send("Something failded." + err);
        });

        // Homepage
        router.get('/', function(req, res) {
            res.render('index');
            console.log(req.user)
        });

        // Login
        router.get('/login', function(req, res) {
            res.render('login');
        });

        router.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

        //Login with facebook
        router.get('/auth/facebook',
            passport.authenticate('facebook', {
                scope: ['user_location', 'email']
            })
        );

        // handle control to passport to use code to grab profile info
        router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/questionnaire',
            failureRedirect: '/error',
            session: true
        }));

        // Signup
        router.get('/signup', (req, res) => {
            res.render('signup');
        });

        router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/questionnaire',
            failureRedirect: '/error'
        }));

        // Logout
        router.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/login');
        });

        // Signup error
        router.get('/error', (req, res) => {
            res.send('You are not logged in!');
        });

        // Questionnaire
        router.get('/questionnaire', function(req, res) {
            res.render('questionnaire');
        });

        router.post('/questionnaire', function(req, res) {
            console.log(req.body);
            knex('quiz').insert({
                q1: req.body.gender,
                q2: req.body.age,
                q3: req.body.frequency,
                q4: req.body.taste,
                q5: req.body.price
            }).then(function() {
                console.log('Message received');
                res.render('qr')
            });
        })

        // Questionnaire-Result
        router.get('/qr', function(req, res) {
            res.render('qr');
        });

        // Subscription
        router.get('/api/user/details', function(req, res) {
            res.send('details');
        });

        // Subscription
        router.get('/api/order/subscription', function(req, res) {
            res.send('subscription');
        });


        // Subscription
        router.get('/subscription', function(req, res) {
            res.render('subscription');
        });

        router.put('/api/subscription', function(req, res) {
            console.log(req.body);

            res.send('Message received');
            knex('order').insert({
                subscription: req.body.subscription,
                facebookid: middleWare
            }).then(function() {});
        })

        // Checkout
        router.get('/checkout', function(req, res) {
            res.render('checkout');
        })

        // Transaction
        router.post('/tx', function(req, res) {
            console.log(req.body);
            res.send('Message received');
            knex('order').insert({
                txid: req.body
            }).then(function() {});
        })

        // Done Page
        router.get('/done', function(req, res) {
            res.render('done');
        })

        // Change Password
        router.get('/change-pw', function(req, res) {
            res.render('change-pw');
        })

        // Customer-Backend
        router.get('/customer-backend', function(req, res) {
            res.render('customer-backend');
        })

        return router;
    }
}