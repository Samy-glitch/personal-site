// set year

var days = document.getElementById("days");
var years = document.getElementById("years");
var daysBn = document.getElementById("daysBn");
var yearsBn = document.getElementById("yearsBn");
let today = new Date();
let date1 = new Date("03/23/2007");

let Difference_In_Time = today.getTime() - date1.getTime();

let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

let Difference_In_Year = Math.round(
  Difference_In_Time / (1000 * 3600 * 24 * 365)
);

days.innerHTML += `${Difference_In_Days} days `;
years.innerHTML += ` ${Difference_In_Year} years`;

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

function logDate(date, date2) {
  var Tdate = new Date();
  var diff = Math.abs(new Date(date) - new Date());
  var minutes = Math.floor(diff / 1000 / 60);
  var nextUpdateM = 120 - minutes;
  console.log("updated at: " + date2);
  console.log("last updated: " + minutes + " minutes ago");

  if (new Date(date).getHours() + 2 >= 24) {
    var hours1 = new Date(date).getHours() - 22;
    var hours2 = ("0" + hours1).slice(-2);
    var minutes1 = new Date(date).getMinutes();
    var minutes2 = ("0" + minutes1).slice(-2);
    var hoursDiff = hours2 + ":" + minutes2;
    console.log("update at: " + tConvert(hoursDiff));
  } else {
    var hours1 = new Date(date).getHours() + 2;
    var hours2 = ("0" + hours1).slice(-2);
    var minutes1 = new Date(date).getMinutes();
    var minutes2 = ("0" + minutes1).slice(-2);
    var hoursDiff2 = hours2 + ":" + minutes2;
    console.log("update at: " + tConvert(hoursDiff2));
  }
  console.log("next update in: " + nextUpdateM + " minutes");
}

// set anime & manga list

const episode = document.getElementById("episode");
const anime = document.getElementById("anime");
const manga = document.getElementById("manga");
const episodeBn = document.getElementById("episodeBn");
const animeBn = document.getElementById("animeBn");
const mangaBn = document.getElementById("mangaBn");

fetch("./sample.json")
  .then((response) => response.json())
  .then((data) => {
    episode.innerHTML += `${data.episode} episodes`;
    anime.innerHTML += `${data.anime} anime series`;
    manga.innerHTML += `${data.manga} manga chapters`;
    logDate(data.lastUpdatedRaw, data.lastUpdated);
  });
