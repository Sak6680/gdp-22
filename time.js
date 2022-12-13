var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    setInterval(function(){
                var d = new Date();
            var day = days[d.getDay()];
            var hr = d.getHours();
            var min = d.getMinutes();
            var sec = d.getSeconds()
            if (min < 10) {
                min = "0" + min;
            }
            var ampm = "am";
            if( hr > 12 ) {
                hr -= 12;
                ampm = "pm";
            }
            var date = d.getDate();
            var month = months[d.getMonth()];
            var year = d.getFullYear();
            var x = document.getElementById("time");
            x.innerHTML = day + " " + hr + ":" + min  + ":" +  sec + " " + year  + " " + month + " " + date;
    }, 1000);
