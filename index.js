const epochSession = Math.trunc(Date.now() / 1000);
var epochNow = epochSession;
var epochPost = epochNow;

var epochMilliNow = Date.now();
const epochStartMilli = 1633046400000;

var jsonData = {};
var jsonDataSorted = {};
var rank = 0;

var pvSession = 1;
var clickSession = 0;
var clickSessionNew = 0;
var timeSessionSec = 0;
var timeSessionNewSec = 0;
var lastView = 0;


getData();
function sortData() {
    Object.keys(jsonData).forEach(function (key) {
        jsonData[key]["now"] = Math.trunc((jsonData[key]["gdp22"] + jsonData[key]["gdp22-23"] * ((epochMilliNow-epochStartMilli) / 31536000000)) * 1000000000);
        jsonData[key]["now-pc"] = jsonData[key]["gdppc22"] + jsonData[key]["gdppc22-23"] * ((epochMilliNow-epochStartMilli) / 31536000000);
    });

    jsonDataSorted = {};
    jsonDataSorted = Object.keys(jsonData).map(function(key) {
        return jsonData[key];
    }).sort(function(a, b) {
        return (a.now > b.now) ? -1 : 1;
    });
};

async function getData() {
    try {
        const res = await fetch("https://sak6680.github.io/gdpGdpPc/gdp.json");
        if (res.status === 200) {
            jsonData = await res.json();
            sortData();

            if (toggleCount == 1) {
                // moveCount();
            } else {
            }
        }
    } catch (error) {}
};

function moveCount() {
    rank = 0;
    Object.keys(jsonDataSorted).forEach(function (key) {
        ++rank;
        const code = jsonDataSorted[key]["code"];
        const country = jsonDataSorted[key]["country"];
        const now = Number(jsonDataSorted[key]["now"]);
        const change = Number(jsonDataSorted[key]["gdp22-23"]);
        const nowPC = Number(jsonDataSorted[key]["now-pc"]);
        const changePC = Number(jsonDataSorted[key]["gdppc22-23"]);

        const html = `<span class="rank">${rank}</span><img src="https://sak6680.github.io/flag/${code}.png" width="32" height="24" alt="${country} flag" class="icon"><span class="country icon-text">${country}</span><span id="${code}Now" class="now stats-text">${now.toLocaleString()}</span><span id="${code}NowPC" class="now-pc stats-text">${decimal2(Number(nowPC.toFixed(2)).toLocaleString())}</span>`;

        document.getElementById(`liItem${rank}`).innerHTML = html;

        if (change > 0) {
            document.getElementById(`${code}Now`).style.color = "#0f9d58";
        } else if (change < 0) {
            document.getElementById(`${code}Now`).style.color = "#db4437";
        } else {
            document.getElementById(`${code}Now`).style.color = "#dddddd";
        }

        if (changePC > 0) {
            document.getElementById(`${code}NowPC`).style.color = "#0f9d58";
        } else if (changePC < 0) {
            document.getElementById(`${code}NowPC`).style.color = "#db4437";
        } else {
            document.getElementById(`${code}NowPC`).style.color = "#dddddd";
        }
    });
}



function decimal2(strNumber) {
    if (strNumber.indexOf(".") == -1) {
        return strNumber + ".00";
    } else if (strNumber.toString().split('.')[1].length == 1) {
        return strNumber + "0";
    } else {
        return strNumber;
    }
};

const intervalUpdate = function() {
    epochMilliNow = Date.now();
    
    if (toggleCount == 1) {
        Object.keys(jsonDataSorted).forEach(function (key) {
            const code = jsonDataSorted[key]["code"];

            const now = Math.trunc((jsonDataSorted[key]["gdp22"] + jsonDataSorted[key]["gdp22-23"] * ((epochMilliNow-epochStartMilli) / 31536000000)) * 1000000000);
            document.getElementById(`${code}Now`).innerText = now.toLocaleString();

            const nowPC = jsonDataSorted[key]["gdppc22"] + jsonDataSorted[key]["gdppc22-23"] * ((epochMilliNow-epochStartMilli) / 31536000000);
            const lastPC = Number(document.getElementById(`${code}NowPC`).innerText.replace(/,/g, ""));
            if (nowPC != lastPC) {
                document.getElementById(`${code}NowPC`).innerText = decimal2(Number(nowPC.toFixed(2)).toLocaleString());
            }
        });
    }
};
setInterval(intervalUpdate, 100);

function click() {
    ++clickSession;
    ++clickSessionNew;
    
    localStorage.setItem("clickSession", clickSession);
};

document.body.addEventListener("click", click);

document.body.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        click();
    }
});

document.body.addEventListener("contextmenu", click);

document.getElementById("toggle").addEventListener("click", function () {
    if (document.getElementById("toggle").checked) {
        toggleCount = 1;
        moveCount();
    } else {
        toggleCount = 0;
        stopCount();
    }
    localStorage.setItem("toggleCount", toggleCount);
});

// document.getElementById("toggleText").addEventListener("click", function () {
//     if (document.getElementById("toggle").checked) {
//         toggleCount = 0;
//         document.getElementById("toggle").checked = false;
//         document.getElementById("toggleText").innerText = "End Mar. 2022";
//         stopCount();
//     } else {
//         toggleCount = 1;
//         document.getElementById("toggle").checked = true;
//         document.getElementById("toggleText").innerText = "Realtime";
//         moveCount();
//     }
//     localStorage.setItem("toggleCount", toggleCount);
// });
