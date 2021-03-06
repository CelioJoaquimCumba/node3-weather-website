

fetch('http://puzzle.mead.io/puzzle').then(response =>{
    response.json().then(result=>{
        console.log(result);
    })
})

document.addEventListener('DOMContentLoaded',()=>{ 


    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    messageOne.textContent = 'Please enter';

    
    
    
    weatherForm.addEventListener('submit',(e)=>{
        const location = search.value;
        e.preventDefault();
        console.log(location)

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = 'temperature:'+ data.forecast.temperature + '\nDescription:' + data.forecast.description[0]
                }
            })
        })
        
        

        
    
        
    })
})