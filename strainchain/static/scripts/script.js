document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/networks-build') {
        console.log('On networks-build page')
        //these functions are for a multi step html form
        //each step is hidden till next or prev is clicked
        document.getElementById('next1').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next1 button clicked')
            document.getElementById('step1').classList.add('d-none');
            document.getElementById('step2').classList.remove('d-none');
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
            document.getElementById('step2').classList.add('d-none');
            document.getElementById('step3').classList.remove('d-none');
        });
        
        document.getElementById('prev3').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Prev3 button clicked')
            document.getElementById('step3').classList.add('d-none');
            document.getElementById('step2').classList.remove('d-none');
        });

        //function to handle form submission
        function submitAllForms() {
            var formData1 = new FormData(document.getElementById('growernetworkbuildform1'));
            var formData2 = new FormData(document.getElementById('growernetworkbuildform2'));
            var formData3 = new FormData(document.getElementById('growernetworkbuildform3'));

            var allFormData = new FormData();
            allFormData.append('form1', formData1);
            allFormData.append('form2', formData2);
            allFormData.append('form3', formData3);

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "/networks-build", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("All Forms Submitted Successfully");
                        //If needed add other action post server response
                    } else {
                        console.error("Error Submitting Forms:", xhr.statusText);
                    }
                }
            };

            xhr.send(allFormData);
        }

        //Event Listender for Submit
        document.getElementById('submit').addEventListener('click', function(e) {
            e.preventDefault();
            submitAllForms();
        });

        //function to handle file drop zone
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