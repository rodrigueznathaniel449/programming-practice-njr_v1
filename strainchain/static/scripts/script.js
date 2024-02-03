document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/networks-build') {
        console.log('On networks-build page')
        //functions to validate form inputs
        function validateStep1() {
            const networkname = document.getElementById('networkname').value.trim();
            const accessmodelselect = document.getElementById('accessmodelselect').value.trim();
            const networkdescription = document.getElementById('networkdescription').value.trim();

            if (networkname === '' || accessmodelselect === '' || networkdescription === '') {
                alert('Please fill out all required fields');
                return false;
            }

            return true;
        }

        function validateStep2() {
            const batchdescription = document.getElementById('batchdescription').value.trim();
            const labdescription = document.getElementById('labdescription').value.trim();

            if (batchdescription === '' || labdescription === '') {
                alert('Please fill out all required fields');
                return false;
            }

            return true;
        }
        
        //these functions are for a multi step html form
        //each step is hidden till next or prev is clicked
        document.getElementById('next1').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next1 button clicked')
            if (validateStep1()) {
                document.getElementById('step1').classList.add('d-none');
                document.getElementById('step2').classList.remove('d-none');
            }
        });
        
        document.getElementById('prev2').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Prev2 button clicked')
            document.getElementById('step2').classList.add('d-none');
            document.getElementById('step1').classList.remove('d-none');
        });
        
        document.getElementById('next2').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next2 button clicked')
            if (validateStep2()) {
                document.getElementById('step2').classList.add('d-none');
                document.getElementById('step3').classList.remove('d-none');
            }
        });
        
        document.getElementById('prev3').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Prev3 button clicked')
            document.getElementById('step3').classList.add('d-none');
            document.getElementById('step2').classList.remove('d-none');
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