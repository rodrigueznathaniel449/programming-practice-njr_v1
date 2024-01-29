let currentStep = 1;

        function nextStep(step) {
            // Hide the current step
            document.getElementById(`step${currentStep}`).style.display = 'none';

            // Show the next step
            currentStep = step;
            document.getElementById(`step${currentStep}`).style.display = 'block';
        }