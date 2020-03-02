function myFunction(x) {

    let navbarToggler = document.querySelector('#navbarToggler')
    let navbar = document.querySelector('#navbar')


    navbarToggler.addEventListener('click', function(e) {
        x.classList.toggle('change')
        navbar.classList.toggle('menu-show')
        e.stopPropagation()
        console.log('kliknuto')
    })

    document.addEventListener('click', function() {
        navbar.classList.remove('menu-show')

    })

}