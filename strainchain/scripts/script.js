document.getElementById('next1').addEventListener('click', function() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
});

document.getElementById('prev2').addEventListener('click', function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
});

document.getElementById('next2').addEventListener('click', function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
});

document.getElementById('prev3').addEventListener('click', function() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
});