[a, b, c, ...d] = [1, 2, 3, 4, 5, 20];
console.log(`d => ${d}, type => ${typeof(d)}`);

function sendRequest() {
    let pElem = document.querySelector('.response')
    let inputElem = document.querySelector('.inputMsg').value

    fetch('http://localhost:5000/sendMessage', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: inputElem})
    })
    .then((response) => response.text()) // Wait for the Promise from response.text() to resolve
    .then((data) => {
        pElem.innerText = data;
        console.log(data);
    })
}