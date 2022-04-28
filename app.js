let quoteText = document.querySelector(".quoteText");
let quoteGrabber = document.querySelector("#quote");
let greetingText = document.querySelector(".greetingText");
let clockText = document.querySelector("#clock");
let locationText = document.querySelector("#location");
let moonSun = document.querySelector("#moonSun");
let moreDetailes = document.querySelector(".moreDetailes");

let timeZone = document.querySelector(".timeZone");
let isp = document.querySelector(".ISP");
let latLod = document.querySelector(".LatLod");
let code = document.querySelector(".code");
const moreLessContainerBtn = document.querySelector("#moreLessContainer");
const middleContainerGrabber = document.querySelector(".middleContainer");
const btnText = document.querySelector(".btnText");
const imgBtn = document.querySelector(".imgBtn");
let ip;
let time;
let mainCity;
let country;
let flag = true;
let getUserLocation = () => {
	// fetch the user public ip
	fetch(`http://worldtimeapi.org/api/ip`)
		.then((response) => response.json())
		.then(
			(data) => (
				(time = data.datetime),
				(ip = data.client_ip),
				(time = time.slice(11, 16)),
				(clockText.innerHTML = time),
				(clockText.style.opacity = 1),
				greeting(),
				fetch(
					`http://ip-api.com/json/${ip}`
				)
					.then((response1) => response1.json()).then((data) =>(
                        console.log(data),
                        mainCity = data.city,
                        country = data.country,
                        locationText.innerHTML = `in ${mainCity}, ${country}`,
						timeZone.innerHTML = data.timezone,
						latLod.innerHTML = `${data.lat}/${data.lon}`,
						isp.innerHTML = data.isp,
						code.innerHTML = data.countryCode
                    ) )
			)
		);
};
let greeting = () => {
	let hour = time.slice(0, 2);
	if (hour >= 6 && hour < 12) {
		greetingText.innerHTML = "Good Morning";
		moonSun.src = "/images/icon-sun.svg";
        document.body.style.backgroundImage = 'url(./images/mobile-day-backgound.png)'
	} else if (hour >= 12 && hour < 18) {
		greetingText.innerHTML = "Good Afternoon";
		moonSun.src = "/images/icon-sun.svg";
        document.body.style.backgroundImage = 'url(./images/mobile-day-backgound.png)'
	} else if (hour >= 18 && hour < 21) {
		greetingText.innerHTML = "Good Evening";
		moonSun.src = "/images/icon-moon.svg";
        document.body.style.backgroundImage = 'url(./images/mobile-night-backgound.png)'
        document.body.style.color = "#fff"
	} else {
		greetingText.innerHTML = "Good Night";
		moonSun.src = "/images/icon-moon.svg";
        document.body.style.backgroundImage = 'url(./images/mobile-night-backgound.png)'
        document.body.style.color = "#fff"

	}
};
moreLessContainerBtn.addEventListener("click", () => {
    if(flag){
        btnText.innerHTML = "Less"
        quoteGrabber.style.display = "none"
        moreDetailes.style.display = "flex"
        imgBtn.style.transform  = "rotate(180deg)"
        middleContainerGrabber.style.marginTop = "3rem"
        flag = false
    }else{
        btnText.innerHTML = "More"
        quoteGrabber.style.display = "block"
        moreDetailes.style.display = "none"
        imgBtn.style.transform  = "rotate(0deg)"
        middleContainerGrabber.style.marginTop = "0rem"
        flag = true
    }

})
let getAdvice = () => {
	fetch("	https://api.adviceslip.com/advice").then(response => response.json()).then(data => quoteText.innerHTML = data.slip.advice)
}
getUserLocation();
getAdvice();

// margin-top: -30rem;
