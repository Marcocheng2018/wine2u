$(() => {
    $('#s1').on('click', (e) => {
        e.preventDefault();
        axios.put('/api/subscription', {
            "subscription": 1
        })
        .then(() => document.location=('https://localhost:3000/checkout'))
        .catch(err => console.log(err));
    })

    $('#s2').on('click', (e) => {
        e.preventDefault();
        axios.put('/api/subscription', {
            "subscription": 4
        })
        .then(() => document.location=('https://localhost:3000/checkout'))
        .catch(err => console.log(err));
    })

    $('#s3').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/subscription', {
            "subscription": 12
        })
        .then(() => document.location=('https://localhost:3000/checkout'))
        .catch(err => console.log(err));
    })
})