let key ="3a4a39b4b863bc3e8f550696322a998b"
let cnt =7;

async function getWeatherData()
{
    try {
    let city=document.getElementById("city").value;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=3a4a39b4b863bc3e8f550696322a998b&units=metric`);
  
    let data = await res.json();
    // console.log("data : ",data)

    showWeather(data);
    }
    catch(err)
    {
        console.log("err",err)
    }
}

function showWeather(d)
{
    console.log(d)

    let frame = document.createElement("div")

    let name = document.createElement("p")
    name.innerText = `City : ${d.city.name}`;

    
    let sunrise = document.createElement("p")
    let rise_val = new Date(d.city.sunrise*1000)
    let rise_time = rise_val.toLocaleTimeString();
    sunrise.innerText = `Sunrise : ${rise_time}`;

    let c_date = document.createElement("p")
    c_date.innerText = `Date : ${rise_val.toLocaleDateString()}`;
    
    let sunset = document.createElement("p")
    let set_val = new Date(d.city.sunset*1000)
    let set_time = set_val.toLocaleTimeString();
    sunset.innerText = `Sunset : ${set_time}`;
    
    let feel_like = document.createElement("p")
    feel_like.innerText= `Feels Like : ${d.list[0].main.feels_like}°C`
    
    let max_temp = document.createElement("p")
    max_temp.innerText= `Max Temp : ${d.list[0].main.temp_max}°C`

    let min_temp = document.createElement("p")
    min_temp.innerText= `Min Temp : ${d.list[0].main.temp_min}°C`

    let humidity = document.createElement("p")
    humidity.innerText= `Humidity : ${d.list[0].main.humidity}`

    let curr_pressure = document.createElement("p")
    curr_pressure.innerText= `Pressure : ${d.list[0].main.pressure}`
    
    let week_box = document.createElement("div")
    week_box.setAttribute("class","week_box")
    
    for(let i=0;i<d.list.length;i++)
    {
        var box = document.createElement("div")
        box.setAttribute("class","box")
        
        let icon = document.createElement("img")
        icon.src = `http://openweathermap.org/img/wn/${d.list[i].weather[0].icon}@2x.png`

        let cdes = document.createElement("div")
        cdes.style.textTransform = "capitalize";
        cdes.innerText = (d.list[i].weather[0].description)

        let line = document.createElement("hr")

        let max_temp = document.createElement("p")
        max_temp.innerText = `Max Temp : ${d.list[i].main.temp_max}°C`;

        let min_temp = document.createElement("p")
        min_temp.innerText = `Min Temp : ${d.list[i].main.temp_min}°C`;
        
        let humidity = document.createElement("p")
        humidity.innerText = `Humidity : ${d.list[i].main.humidity}`;
        
        let pressure = document.createElement("p")
        pressure.innerText = `Pressure : ${d.list[i].main.pressure}`;

        console.log(icon,cdes,max_temp,min_temp,humidity,pressure)
        
        box.append(icon,cdes,line,max_temp,min_temp)        
        // box.append(icon,cdes,line,max_temp,min_temp,humidity,pressure)        
        week_box.append(box)        
    }
    frame.append(name,c_date,sunrise,sunset,feel_like,min_temp,max_temp,humidity,curr_pressure)  

    // console.log(name,sunrise,sunset,feel_like,min_temp,max_temp,humidity,curr_pressure)
    // console.log(week_box) 

    document.getElementById("show").innerHTML="";
    document.getElementById("show").append(frame)
        
    document.getElementById("forecast").innerHTML="";
    document.getElementById("forecast").append(week_box)

    let map = document.getElementById("gmap_canvas")
    map.src = `https://maps.google.com/maps?q=${d.city.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

}



