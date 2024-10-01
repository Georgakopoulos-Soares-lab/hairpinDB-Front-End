document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            const clickableElements = document.querySelectorAll('.logo-click, .logo-click *');
            clickableElements.forEach(element => {
                element.style.cursor = 'pointer';  // Change cursor to pointer on hover
                element.addEventListener('click', function(e) {
                    const target = e.target.closest('.logo-click');
                    const href = target.getAttribute('data-href') || target.querySelector('[data-href]').getAttribute('data-href');
                    if (href) {
                        window.location.href = href;
                    }
                });
            });
        })
        .catch(error => console.error('Error loading navbar:', error));

        fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));

    
});
