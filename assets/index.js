let API_KEY = "111e63a9c3e1272a59e4fd7cadd83092"

// fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=Kiel&cnt=3&appid=e495b143d1997eef5ce41e7a36135142&units=metric`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })


let div = document.querySelector(".clock");


const timeFunc = () => {
    let date = new Date();
    let h = date.getHours();
    let d = date.getMinutes();
    let s = date.getSeconds();

    let clock = `${h}:${d}:${s}`;
    if (h > 12) {
        h -= 12;
        div.style.cssText = "background-color:skyblue; color:black"
        if (h < 10) {
            h = `${h}`;
        }
        if (d < 10) {
            d = `0${d}`;
        }
        if (s < 10) {
            s = `0${s}`;
        }
        clock = `${h}:${d}:${s}PM`

    } else {
        if (h < 10) {
            h = `0${h}`;
        }

        if (d < 10) {
            d = `0${d}`;
        }
        if (s < 10) {
            s = `0${s}`;
        }
        clock = `${h}:${d}:${s}AM`
    }








    div.innerText = clock;

}

setInterval(timeFunc, 1000); //every 1000 milisecond call the timeFunc

timeFunc();




//


let divContainer = document.querySelector(".container");
const getWeatherData = () => {
    navigator.geolocation.getCurrentPosition((success) => {
        // console.log(success);==>we got the object 
        const { latitude, longitude } = success.coords; //==>latitude, longitude these are inside the coords obj
        // console.log(latitude, longitude);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                data.daily.forEach((el, index) => {


                    console.log(el);
                    let div = document.createElement("div");
                    let days = document.createElement("p");
                    days.classList.add("days");
                    div.classList.add("group", `group${index}`)
                    divContainer.append(div);
                    let ul = document.createElement("ul");

                    let li1 = document.createElement("li");
                    li1.classList.add("degree");
                    let li2 = document.createElement("li");

                    let li3 = document.createElement("li");
                    let li4 = document.createElement("li");
                    let li5 = document.createElement("li");
                    let li6 = document.createElement("li");
                    let li7 = document.createElement("li");
                    /* <i class="fas fa-location-arrow"></i> */

                    let main1 = document.createElement("li")
                    main1.classList.add("main");
                    let font = document.createElement("li");
                    let icon1 = document.createElement("img");
                    icon1.classList.add("icons")
                    div.append(days, icon1, ul);


                    ul.append(li1, main1, li2, li3, li4, li5, li6, li7, font);

                    const { temp: { day, min, max, night, eve, morn }, wind_speed, humidity } = el
                    console.log(humidity)
                    const { main, icon } = el.weather[0];
                    icon1.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

                    main1.innerText = `${main}`;
                    font.innerHTML = `<i class="fas fa-location-arrow"> ${wind_speed} km/sa </i>`
                        // font.innerText = ` ${wind_speed}m/s`;
                    li1.innerText = `${day.toFixed(0)}°C`
                    li2.innerText = `Min: ${min.toFixed(0)}°C`
                    li3.innerText = `Max: ${max.toFixed(0)}°C`
                    li4.innerText = `Morning: ${morn.toFixed(0)}°C`
                    li5.innerText = `Evening: ${eve.toFixed(0)}°C`
                    li6.innerText = `Nigth: ${night.toFixed(0)}°C`
                    li7.innerText = `Humidity: ${humidity}`

                    //to assign days 


                    let today = new Date().getDay(); //2

                    let indexOfDay = (index + today);
                    if (indexOfDay > 6) {
                        indexOfDay = indexOfDay % 6
                    }

                    switch (indexOfDay) {
                        case 0:
                            days.innerText = "Sun";
                            break;
                        case 1:
                            days.innerText = "Mon";
                            break;
                        case 2:
                            days.innerText = "Tue";
                            break;
                        case 3:
                            days.innerText = "Wed";
                            break;
                        case 4:
                            days.innerText = "Thu";
                            break;
                        case 5:
                            days.innerText = "Fri";
                            break;
                        case 6:
                            days.innerText = "Sat";
                            break;
                    }






                })


            })

    })
}

getWeatherData();