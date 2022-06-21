// https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_7mQftIGFkSb3rv1oVuODCZ4PJHe7I&ipAddress=8.8.8.8

const baseUrl = 'https://geo.ipify.org/api/v2/country,city,vpn?apiKey='
const apiKey = 'at_7mQftIGFkSb3rv1oVuODCZ4PJHe7I&ipAddress='
const input = document.querySelector('.input')
const arr = document.querySelector('.arrs');
const ip = document.querySelector('.ipAddress')
const timezone = document.querySelector('.timezones')
const isp = document.querySelector('.isps')
const place = document.querySelector('.locations')
const incorrect = document.querySelector('.incorrect')
// const ipAddress = document.querySelector('.ipAddress')
// const locations = document.querySelector('.locations')
// const timezones = document.querySelector('.timezones')
// const isps = document.querySelector('.isps')

console.log(place)
arr.addEventListener('click', (event) => {
    event.preventDefault()
console.log('yes')
    const madeUrl = `${baseUrl}${apiKey}${input.value}`
    getData(madeUrl)
    .then((data) => {
        filterData(data)
         .then((info) =>{
        postData('/add', info)
        
        })
    })
    })

const getData = async(url) =>{
    try{
        const result = await fetch(url);
        const data = await result.json();
        if (data.ip){
            console.log(data)


            timezone.innerHTML = `UTC ${data.location.timezone}`,
           isp.innerHTML = `${data.isp}`
            place.innerHTML = `${data.location.region}`,
            ip.innerHTML = `${data.ip}`

            newMap([data.location.lat, data.location.lng])
                  
            document.querySelector('.flex').style.display='flex';
        document.querySelector('.incorrect').style.display='none'
        }
        else {
            document.querySelector('.flex').style.display='none';
            document.querySelector('.incorrect').style.display='block';
        }
       incorrect.innerHTML = 'Wrong IP address'
         
        console.log(data)
        return data;
    }
    catch(e){
        console.log(e)
    }
}


const filterData = async(data) =>{
    try{
        if(data.code){
    return data; }
  
    else {
        const info = {
        timezone:data.location.timezone,
        isp: data.isp,
        ip: data.ip,
        location : data.location.region
    }
    return info;

}
}
catch(error){
(console.error(error))
}
}

const postData = async(url ="", data ={}) =>{
try{
    const result = await fetch(url, {
        // Post from the app.js
        method: "POST",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    });
    return result;
    }
    catch(err){
        console.log(err);
    }
    
}




        
//  i used the varible given by leafletjs and put in the layers
var map = L.map('map', {
'layers': [
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
})
]
})
// this is a function that changes the 
// values of the lat and lng and then call it
// it in the data

newMap = (new_map = [6.45407, 3.39467]) =>{
    map.setView(new_map, 13)
    L.marker(new_map).addTo(map)
}


// .setView([6.45407, 3.39467], 13);

