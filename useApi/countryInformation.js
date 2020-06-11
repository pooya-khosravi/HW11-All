$(document).ready(function () {
    let showList = false;// after get info let show names .
    
    $(".dropDown-button").click(function () {
        if(showList === true)
        {
            $(".dropDown-Content").toggle(500);
        }
    });
    
    //req for get name allCountry.
    $.ajax({
        type: "GET",
        url: "https://restcountries.eu/rest/v2",
        success: function (allNameCountryResponse) {
        console.log(allNameCountryResponse);//got response at objectArrayFrame and print this

            showList = true;
            //input all name at dropDown bar.
            $(".dropDown-Content").html("");//clear last name of list.
            for(let i=0 ;i<allNameCountryResponse.length; i++)
            {
                $(".dropDown-Content").append(`<a id="${i}">${allNameCountryResponse[i].name}</a>`);
            }

            $(".dropDown-Content a").click(function () {
                //get object
                let currentObj = getCurrentObject( allNameCountryResponse, $(this).text() )
                console.log(currentObj);

                $(".dropDown-button .dropButton-text").html( currentObj.name );//whe tou select a country this name set to button for show
                $(".dropDown-Content").toggle(500);//hide name list
                $(".title1").css("color","yellow")//change title color in country box
                $(".country-name, .calling-code, .country-flag").css("height","215px");//change size in parent1
                $(".map, .weather").css("height","260px");//change size in parent2
                
                //set value in countryBox with this object
                $("#native-name").html( currentObj.nativeName );
                $("#capital").html( currentObj.capital );
                $("#region").html( currentObj.region +", "+ currentObj.subregion );
                $("#population").html( currentObj.population );
                $("#languages").html( currentObj.languages[0].name +", "+ currentObj.languages[0].nativeName );
                $("#time-zone").html( currentObj.timezones );

                $(".body-callingCode").html( `<span> ${currentObj.callingCodes} </span>` );//set call code for show 

                $(".country-flag").html( `<img src="${ currentObj.flag }" alt="aks" >` );//set flagCode for show 

                //change lat and lng in map 
                myLatLng = {lat: (currentObj.latlng[0]), lng: (currentObj.latlng[1])},
                map = new google.maps.Map(document.getElementsByClassName('map')[0], {
                    center: myLatLng,
                    zoom: 4
                });
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: "your indented location"
                });

                //send req for get weather information at this location of  openweathermap.org api
                $.ajax({
                    type: "GET",
                    url: `http://api.openweathermap.org/data/2.5/weather?lat=${currentObj.latlng[0]}&lon=${currentObj.latlng[1]}&appid=ba659d3eed3d08f4c56c4e4658e1b111`,
                    success: function (weatherApiResponse) {
                        console.log( weatherApiResponse );//print response

                        $(".image-info").css("height","auto");
                        
                        //set weather icon
                        $("#image-icon").html( `<img src="http://openweathermap.org/img/wn/${weatherApiResponse.weather[0].icon}@2x.png" alt="weather icon">` );
                        //set weather text
                        $("#conditionText").html( weatherApiResponse.weather[0].description );

                        //set value information with this object that got openweathermap.org api
                        $("#wind-speed").html( weatherApiResponse.wind.speed );
                        $("#temperature").html( weatherApiResponse.main.temp );
                        $("#humidity").html( weatherApiResponse.main.humidity );
                        $("#visibility").html( "none" );
                    }
                });
            });
        },
        error: function (err) {
            if(err)
            {
                console.log(err);
            }
        }
    });
});

//search for get object and return intended object
function getCurrentObject(arr, countryName) {
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i].name === countryName)
        {
            return arr[i];
        }
    }
}