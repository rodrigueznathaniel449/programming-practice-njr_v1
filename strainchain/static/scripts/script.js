document.getElementById('next1').addEventListener('click', function() {
    console.log('Next1 button clicked')
    document.getElementById('step1').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
});

document.getElementById('prev2').addEventListener('click', function() {
    console.log('Prev2 button clicked')
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('step1').classList.remove('d-none');
});

document.getElementById('next2').addEventListener('click', function() {
    console.log('Next2 button clicked')
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('step3').classList.remove('d-none');
});

document.getElementById('prev3').addEventListener('click', function() {
    console.log('Prev3 button clicked')
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
});