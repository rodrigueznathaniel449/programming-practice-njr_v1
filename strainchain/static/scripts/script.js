document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/networks-build') {
        //console.log('On networks-build page')
        //Cache blank values for form inputs
        let step1Data = {
            networkname: '',
            accessmodelselect: '',
            networkdescription: ''
        };

        let step2Data = {
            batchdescription: '',
            labdescription: ''
        };
        
        //functions to validate form inputs
        function validateStep1() {
            step1Data.networkname = document.getElementById('networkname').value.trim();
            step1Data.accessmodelselect = document.getElementById('accessmodelselect').value.trim();
            step1Data.networkdescription = document.getElementById('networkdescription').value.trim();

            if (step1Data.networkname === '' || step1Data.accessmodelselect === '' || step1Data.accessmodelselect === 'Choose A Model' || step1Data.networkdescription === '') {
                alert('Please fill out all required fields');
                return false;
            }

            return true;
        }

        function validateStep2() {
            step2Data.batchdescription = document.getElementById('batchdescription').value.trim();
            step2Data.labdescription = document.getElementById('labdescription').value.trim();

            if (step2Data.batchdescription === '' || step2Data.labdescription === '') {
                alert('Please fill out all required fields');
                return false;
            }

            return true;
        }
        
        //these functions are for a multi step html form
        //each step is hidden till next or prev is clicked
        //Designed to work if validation renders true
        document.getElementById('next1').addEventListener('click', function(e) {
            e.preventDefault();
            //console.log('Next1 button clicked')
            if (validateStep1()) {
                document.getElementById('step1').classList.add('d-none');
                document.getElementById('step2').classList.remove('d-none');
            }
        });
        
        document.getElementById('prev2').addEventListener('click', function(e) {
            e.preventDefault();
            //console.log('Prev2 button clicked')
            document.getElementById('step2').classList.add('d-none');
            document.getElementById('step1').classList.remove('d-none');
        });
        
        document.getElementById('next2').addEventListener('click', function(e) {
            e.preventDefault();
            //console.log('Next2 button clicked')
            if (validateStep2()) {
                document.getElementById('step2').classList.add('d-none');
                document.getElementById('step3').classList.remove('d-none');
            }
        });
        
        document.getElementById('prev3').addEventListener('click', function(e) {
            e.preventDefault();
            //console.log('Prev3 button clicked')
            document.getElementById('step3').classList.add('d-none');
            document.getElementById('step2').classList.remove('d-none');
        });

        // Submit Function, Pass Data to Server Side Code
        document.getElementById('submit').addEventListener('click', function() {
            console.log('submit button clicked')
            //Check if the form is already being submitted
            if (isSubmitting) {
                return;
            }
            //set the form as submitting to avoid duplicate call
            isSubmitting = true;
            // Validate Data
            if (validateStep1() && validateStep2()) {
                // Combine form data
                const formData = new FormData();
                for (const key in step1Data) {
                    formData.append(key, step1Data[key]);
                }
                for (const key in step2Data) {
                    formData.append(key, step2Data[key]);
                }

                // AJAX Request to Server
                fetch('/networks-build', {
                    method: 'POST',
                    body: formData  // Use formData instead of JSON.stringify
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Form Submitted Successfully');
                    } else {
                        console.error('Form Submission Failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    //reset the form submitting state
                    isSubmitting = false;
                });
            }
        });

        //steps to handle file drop zone
        const fileDropZone = document.getElementById('file-drop-zone');
        const fileInput = document.getElementById('file-input');
        const fileList = document.getElementById('file-list');

        fileDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDropZone.classList.add('bg-light');
        });

        fileDropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileDropZone.classList.remove('bg-light');
        });

        fileDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDropZone.classList.remove('bg-light');

            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            handleFiles(files);
        });

        function handleFiles(files) {
            fileList.innerHTML = '';

            for (const file of files) {
                const listItem = document.createElement('div');
                listItem.innerText = file.name;
                fileList.appendChild(listItem);
            }
        }
    }
});