


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para = document.querySelector('.resultPara');
const para2 = document.querySelector('.errorPara');

weatherForm.addEventListener('submit',(e)=>{   //e for event
    e.preventDefault();

    const location = search.value;
    
   para.textContent = 'Fetching weather data.....';
    para2.textContent = '';
    
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            para.textContent = '';
           para2.textContent = data.error;
        }else{
            para.textContent = 'In '+ data.location + '. its '+ data.temperature + ' degrees out. And it feels like '+ data.feelslike + ' degrees.'
            para2.textContent = '';
            
        }
    })
})
})