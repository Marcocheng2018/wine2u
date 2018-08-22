$(() => {
    $('#logout').on('click', () => {
        sessionStorage.clear();
    })
})