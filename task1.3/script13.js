const btnUp = document.querySelector('.up');

document.addEventListener('DOMContentLoaded', ()=> {
    window.addEventListener('scroll', () => {
        btnUp.style.display = (window.pageYOffset > 100) ? 'block' : 'none';
    });
    btnUp.addEventListener('click', () => {
        window.scrollTo({top: 0});
    });
});

