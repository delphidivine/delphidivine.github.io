// function yesNo () {
// 	var options = {
// 	  enableHighAccuracy: true,
// 	  timeout: 5000,
// 	  maximumAge: 0
// 	};

// 	if (navigator.geolocation)  {
// 		console.log("yeah")
// 		navigator.geolocation.getCurrentPosition(success, error, options);
// 	}
// }
var hemiSeason = {}
var constellations =
        {
            "NA" : ["Andromeda", "Aquarius", "Aries", "Cetus", "Grus", "Lacerta", "Pegasus", "Perseus", "Phoenix", "Piscis Austrinus", "Pisces", "Sculptor", "Triangulum"],
            "SS" : ["Andromeda", "Aquarius", "Aries", "Cetus", "Grus", "Lacerta", "Pegasus", "Perseus", "Phoenix", "Piscis Austrinus", "Pisces", "Sculptor", "Triangulum"],
            "NW" : ["Auriga", "Calum", "Canis Major", "Canis Minor", "Carina", "Columba", "Eridanus", "Fornax", "Gemini", "Horologium", "Lepus", "Monoceros", "Orion", "Pictor", "Puppis", "Reticulum", "Taurus", "Vela"],
            "SU" : ["Auriga", "Calum", "Canis Major", "Canis Minor", "Carina", "Columba", "Eridanus", "Fornax", "Gemini", "Horologium", "Lepus", "Monoceros", "Orion", "Pictor", "Puppis", "Reticulum", "Taurus", "Vela"],
            "NS" : ["Antlia", "Boötes", "Cancer", "Canes Venatici", "Centaurus", "Coma Berenices", "Corvus", "Crater", "Hydra", "Leo", "Leo Minor", "Lupus", "Lynx", "Pyxis", "Sextans", "Virgo"],
            "SA": ["Antlia", "Boötes", "Cancer", "Canes Venatici", "Centaurus", "Coma Berenices", "Corvus", "Crater", "Hydra", "Leo", "Leo Minor", "Lupus", "Lynx", "Pyxis", "Sextans", "Virgo"],
            "NU" : ["Aquila", "Ara", "Capricornus", "Corona Australis", "Corona Borealis", "Cygnus", "Hercules", "Delphinus", "Equuleus", "Indus", "Libra", "Lyra", "Microscopium", "Ophiuchus", "Scorpius", "Scutum", "Serpens", "Sagitta", "Sagittarius", "Telescopium", "Vulpecula"],
            "SW" : ["Aquila", "Ara", "Capricornus", "Corona Australis", "Corona Borealis", "Cygnus", "Hercules", "Delphinus", "Equuleus", "Indus", "Libra", "Lyra", "Microscopium", "Ophiuchus", "Scorpius", "Scutum", "Serpens", "Sagitta", "Sagittarius", "Telescopium", "Vulpecula"],
            "NP" : ["Camelopardus", "Cassiopeia", "Cepheus", "Draco", "Ursa Major", "Ursa Minor"],
            "SP" : ["Apus", "Chamaeleon", "Circinus", "Crux", "Dorado", "Hydrus", "Mensa", "Musca", "Norma", "Octans", "Pavo", "Triangulum Australe", "Tucana", "Volans"]
    };

function yesNo () {
	$.ajax({
		url: "https://api.ipify.org?format=json",
		dataType: "json",
		async: false,
		success: function(jsonIP) {
			$.ajax({
				// DEMO PURPOSES
				// HARDCODED IPS
				url: "https://freegeoip.net/json/" + "128.177.113.106", //jsonIP.ip,
				dataType: "json",
				async: false,
				success: function(jsonPos){
					var lat = jsonPos.latitude;
					var long = jsonPos.longitude;
					var urlStr = "https://api.openweathermap.org/data/2.5/forecast?"
					var coord = "lat=" + lat.toString() + "&lon=" + long.toString();
					console.log(coord)
					var API = "&APPID=d4eb7347018f72013868f80a6b93f3fa"
					var url = "http://" + urlStr + coord + API
					console.log(url)
					$.ajax({
					  url: url,
					  dataType: 'json',
					  async: false,
					  success: function(json) {
					  	  try {
					  	  	var dayData = json["list"];

					  	  	for (var i = 0; i < 8; i++) {
					  	  		var sysData = dayData[i]["sys"];
					  	  		var podData = sysData["pod"];

					  	  		if (podData == "n") {
					  	  			var weatherArray = dayData[i]["weather"];
					  	  			var currentWeatherId = weatherArray[0]["id"];
					  	  			// Clear Skies

					  	  			if (currentWeatherId == 800) {
					  	  				console.log("Clear skies")
					  	  				var mainObj = dayData[i]["main"];
					  	  				var tempData = mainObj["temp"];
					  	  				var fTemp = tempData * (1.8) - 459.67;
					  	  				var roundTemp = Math.round(fTemp);


					  					hemiSeason = region(long, lat);
					  					replaceBody(hemiSeason, roundTemp, true);

					  					break;
					  	  			}

					  	  			// Foggy Skies
					  	  			else {
					  	  				var mainObj = dayData[i]["main"];
					  	  				var tempData = mainObj["temp"];
					  	  				var fTemp = tempData * (1.8) - 459.67;
					  	  				var roundTemp = Math.round(fTemp);

					  	  				console.log ("Not clear")

					  	  				hemiSeason = region(long, lat);
					  	  				replaceBody(hemiSeason, roundTemp, false)

					  	  				break;
					  	  			}
					  	  		}
					  	  	}
					  	  } catch (e) {
					  	  	 console.log("error")
					  	  }
					  }
					});

				   	// $.getJSON(url,function(json){
				   	//      document.write(JSON.stringify(json));
				   	//  });

					// if (weatherID == 800) {
					// 	//go to page yes
					// }

					// else {
					// 	//go to page no
					// }

				}
			});
		}
	});

//document.body.innerHTML


// function error () {
// 	console.log("error")
// }
}


function region (long, lat) {
	var hemisphere = "";
	var season = "";
	var reg = "";

	var date = new Date();
	var month = date.getMonth();

	// North Hem
	if (lat >= 0) {
		hemisphere = "N";
		hemiFull = "northern";

		if (month >=3 && month <=5) {
			season = "S";
			seasonFull = "spring";
		} else if (month >=6 && month <= 8) {
			season = "U";
			seasonFull = "summer";
		} else if (month >=9 && month <= 11) {
			season = "A";
			seasonFull = "autumn";
		} else {
			season = "W";
			seasonnFull = "winter";
		}
	} else {
		hemisphere = "S";
		hemiFull = "southern";

		if (month >=3 && month <=5) {
			season = "A";
			seasonFull = "autumn";
		} else if (month >=6 && month <= 8) {
			season = "W";
			seasonFull = "winter";
		} else if (month >=9 && month <= 11) {
			season = "S";
			seasonFull = "spring";
		} else {
			season = "U";
			seasonFull = "summer";
		}
	}

	//CAN DEMO HARDCODE
	hemiSeason = {hemi: hemisphere, seas: season, hemiFull: hemiFull, seasonFull: seasonFull};
	return {hemi: hemisphere, seas: season, hemiFull: hemiFull, seasonFull: seasonFull};
}

function replaceBody (hemiSeason, temp, binary) {
	// DEMO PURPOSES
	// binary = true
	if (binary) {
		var yesStr = document.getElementById("yesPg").innerHTML;
		var res = yesStr.slice(5,-4)
		document.body.innerHTML = res
		document.getElementById("hemisphereSeason").innerHTML = hemiSeason.hemiFull + " hemisphere/" + hemiSeason.seasonFull
		document.getElementById("temperature").innerHTMP = temp + " F/" + ((temp-32)*5)/9 + " C"
		console.log(res)
	} else {
		var noStr = document.getElementById("noPg").innerHTML;
		var res = noStr.slice(5,-4)
		document.body.innerHTML = res
		document.getElementById("hemisphereSeason").innerHTML = hemiSeason.hemiFull + " hemisphere/" + hemiSeason.seasonFull
		document.getElementById("temperature").innerHTMP = temp + " F/" + ((temp-32)*5)/9 + " C"
		console.log(res)
	}
}

function constBut() {
	//console.log(hemiSeason)
	var key = hemiSeason.hemi + hemiSeason.seas;
	var hemisp = hemiSeason.hemiFull[0].toUpperCase() + hemiSeason.hemiFull.slice(1)
	var seas = hemiSeason.seasonFull[0].toUpperCase() + hemiSeason.seasonFull.slice(1)
	var mainStr = "<h2>" + hemisp + " Hemisphere " + seas + " Constellations </h2> <div id = \"consts\" > <ul>";
	var yearStr = "<h2>" + hemisp + " Hemisphere Year Round Constellations </h2> <div id = \"consts\"> <ul>";
	var key2 = hemiSeason.hemi + "P";

	for (var i = 0; i < constellations[key].length; i++) {
		mainStr = mainStr + "<li> " + constellations[key][i] + "</li>";
	}

	mainStr = mainStr + "</ul> </div>"
	for (var i = 0; i < constellations[key2].length; i++) {
		yearStr = yearStr + "<li> " + constellations[key2][i] + "</li>";
	}

	yearStr = yearStr + "</ul></div>"

	totalStr = mainStr + yearStr
	document.getElementById("bodMain").innerHTML = totalStr
}
//d4eb7347018f72013868f80a6b93f3fa
