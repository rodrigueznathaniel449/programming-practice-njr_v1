document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/networks-build') {
        document.getElementById('next1').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('step1').classList.add('d-none');
            document.getElementById('step2').classList.remove('d-none');
        });
        
        document.getElementById('prev2').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('step2').classList.add('d-none');
            document.getElementById('step1').classList.remove('d-none');
        });
        
        document.getElementById('next2').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('step2').classList.add('d-none');
            document.getElementById('step3').classList.remove('d-none');
        });
        
        document.getElementById('prev3').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('step3').classList.add('d-none');
            document.getElementById('step2').classList.remove('d-none');
        });
    }
});

