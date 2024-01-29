document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/networks-build') {
        console.log('On networks-build page')

        // Function to handle step navigation
        function navigateStep(currentStep, nextStepId, prevStepId) {
            document.getElementById(currentStep).classList.add('d-none');
            document.getElementById(nextStepId).classList.remove('d-none');
            document.getElementById(prevStepId).classList.remove('d-none');
        }

        document.getElementById('next1').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next1 button clicked')
            navigateStep('step1', 'step2', 'prev1');
        });

        document.getElementById('prev1').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Prev1 button clicked')
            navigateStep('step1', 'step2', 'prev1');
        });

        document.getElementById('next2').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next2 button clicked')
            navigateStep('step2', 'step3', 'prev2');
        });

        document.getElementById('prev2').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Prev2 button clicked')
            navigateStep('step2', 'step1', 'prev1');
        });

        // Repeat the above pattern for additional steps if needed
    }
});
