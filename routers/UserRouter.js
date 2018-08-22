const express = require('express');

class CustomerRouter {

    constructor(customerService) {
        this.customerService = customerService;
    }

    router() {
        let router = express.Router();
        // Need to add the REST method that the user will be able to do in our website like the GET, POST, DELETE Method
        return router;
    }
}