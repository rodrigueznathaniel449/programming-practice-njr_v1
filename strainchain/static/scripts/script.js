document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/networks-build') {
        //console.log('On networks-build page')
        //Cache blank values for form inputs
        let step1Data = {
            networkname: '',
            accessmodelselect: '',
            networkdescription: ''
        };

        //let step2Data = {
            //batchdescription: '',
            //labdescription: ''
        //};
        
        //functions to validate form inputs
        function validateStep1() {
            console.log('Before Step 1 validation:');
            console.log(step1Data);

            step1Data.networkname = document.getElementById('networkname').value.trim();
            step1Data.accessmodelselect = document.getElementById('accessmodelselect').value.trim();
            step1Data.networkdescription = document.getElementById('networkdescription').value.trim();

            if (step1Data.networkname === '' || step1Data.accessmodelselect === '' || step1Data.accessmodelselect === 'Choose A Model' || step1Data.networkdescription === '') {
                alert('Please fill out all required fields');
                return false;
            }

            console.log('After Step 1 validation:');
            console.log(step1Data);

            return true;
        }

        //function validateStep2() {
            //console.log('Before Step 2 validation:');
            //console.log(step2Data);

            //step2Data.batchdescription = document.getElementById('batchdescription').value.trim();
            //step2Data.labdescription = document.getElementById('labdescription').value.trim();

            //if (step2Data.batchdescription === '' || step2Data.labdescription === '') {
                //alert('Please fill out all required fields');
                //return false;
            //}

            //console.log('After Step 2 validation:');
            //console.log(step2Data);

            //return true;
        //}
        
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
            //if (validateStep2()) {
            //}
            document.getElementById('step2').classList.add('d-none');
            document.getElementById('step3').classList.remove('d-none');
        });

        document.getElementById('certextract').addEventListener('click', function() {
            document.getElementById('step2').classList.add('d-none');
            document.getElementById('step3').classList.remove('d-none');
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
            // Validate Data
            // && validateStep2()
            if (validateStep1()) {
                // Combine form data
                const formData = new FormData();
                for (const key in step1Data) {
                    formData.append(key, step1Data[key]);
                }
                //for (const key in step2Data) {
                    //formData.append(key, step2Data[key]);
                //}

                // Log form data being sent
                for (const [key, value] of formData.entries()) {
                    console.log(`Form Data: ${key} = ${value}`);
                }
                
                // AJAX Request to Server
                fetch('/networks-build', {
                    method: 'POST',
                    body: formData  // Use formData
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

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/my-networks') {
        
        const dropdownButtons = document.querySelectorAll('.dropdown-toggle.growernetworkdeployed');

        dropdownButtons.forEach((button) => {
            button.addEventListener('click', function () {
                const buttonId = button.getAttribute('id');
                const index = buttonId.replace('dropdownmenubutton', '');
                const correspondingCollapsedData = document.getElementById('additionalData' + index);
                if (correspondingCollapsedData) {
                    correspondingCollapsedData.classList.toggle('show');

                    // Calculate total height of expanded dropdowns
                    let totalHeight = 0;
                    dropdownButtons.forEach((btn) => {
                        const dataIndex = btn.getAttribute('id').replace('dropdownmenubutton', '');
                        const collapsedData = document.getElementById('additionalData' + dataIndex);
                        if (collapsedData && collapsedData.classList.contains('show')) {
                            totalHeight += collapsedData.offsetHeight;
                        }
                    });

                    // Adjust the top position of subsequent dropdowns
                    const container = button.closest('.growernetworkcontainer');
                    const currentIndex = Array.from(container.querySelectorAll('.dropdown-toggle.growernetworkdeployed')).indexOf(button);
                    const subsequentDropdowns = Array.from(container.querySelectorAll('.dropdown-toggle.growernetworkdeployed')).slice(currentIndex + 1);
                    subsequentDropdowns.forEach((nextButton) => {
                        const nextIndex = nextButton.getAttribute('id').replace('dropdownmenubutton', '');
                        const nextCollapsedData = document.getElementById('additionalData' + nextIndex);
                        if (nextCollapsedData) {
                            nextCollapsedData.style.top = totalHeight + 'px';
                        }
                    });
                }
            });
        });
    }
});
