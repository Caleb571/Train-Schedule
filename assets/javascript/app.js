//declare all vars
var trainStation,
  trainId,
  trainDest,
  firstDept,
  arrivalTime,
  arrivalCountDown,
  trainPlatform,
  trainFrequency,
  firtTrain;

// time picker for first departure

// MOVE THIS CODE TO SEPERATE FILE

var timepicker = new TimePicker("time", {
  lang: "en",
  theme: "dark"
});
timepicker.on("change", function(evt) {
  var value = (evt.hour || "00") + ":" + (evt.minute || "00");
  evt.element.value = value;
});

var currentTime = moment().format("h:mm");
$("#testing").on("click", function() {
  
    var firstDept = $('.first-departure').val()
    var covertFirstDept = moment(firstDept, 'HH:mm').diff(moment().startOf('day'), 'minutes');
    console.log('my minutes ' + covertFirstDept)
  
    trainFrequency = $("#train-frequency")
    .val()
    .trim();
    console.log('raw arrival time ' , trainFrequency)
    var covertFrquency = moment(trainFrequency, 'mm').diff(moment().startOf('day'), 'minutes');
    console.log('converted arrival time ' , covertFrquency)
    var rawArrivalTime = covertFirstDept + covertFrquency;
    console.log('times combined ' + rawArrivalTime)
    var readyArrivalTime = moment(rawArrivalTime, "HH:mm").format("HH:mm")
    console.log('Arrival Time Complete ' + readyArrivalTime)


    //var rawArrivalTime = moment(covertFirstDept).add(covertFrquency, "minutes").format("mm");
   // console.log('raw arrival time ' , rawArrivalTime)

});

//display current time
$(".currentTime").text(moment().format("h:mm A"));

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAqZNrflv1yu9USlZXzkiybAlT_-cFTuUA",
  authDomain: "train-schedule-hw-53a0f.firebaseapp.com",
  databaseURL: "https://train-schedule-hw-53a0f.firebaseio.com",
  projectId: "train-schedule-hw-53a0f",
  storageBucket: "train-schedule-hw-53a0f.appspot.com",
  messagingSenderId: "786492117314",
  appId: "1:786492117314:web:3e2f837e65c4cbee9cf8db",
  measurementId: "G-32LNSGDLTN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var dataRef = firebase.database();

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  //store all values
  trainStation = $("#train-station")
    .val()
    .trim();
  trainId = $("#train-id")
    .val()
    .trim();
  trainDest = $("#train-destination")
    .val()
    .trim();
  firstDept = $("#first-departure")
    .val()
    .trim();
  arrivalTime = currentTime;
  arrivalCountDown = currentTime;
  trainPlatform = $("#train-platform")
    .val()
    .trim();

  //code for the push
  dataRef.ref().push({
    trainStation: trainStation,
    trainId: trainId,
    trainDest: trainDest,
    firstDept: firstDept,
    trainPlatform: trainPlatform,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

dataRef.ref().on("child_added", function(childSnapshot) {
  // full list of items to the wall
  $("#train-schedule-body").append(
    "<tr>" +
      "<td>" +
      childSnapshot.val().trainStation +
      "</td>" +
      "<td>" +
      childSnapshot.val().trainId +
      "</td>" +
      "<td>" +
      childSnapshot.val().trainDest +
      "</td>" +
      "<td>" +
      childSnapshot.val().arrivalTime +
      "</td>" +
      "<td>" +
      childSnapshot.val().arrivalCountDown +
      "</td>" +
      "<td>" +
      childSnapshot.val().stationPlatform +
      "</td>" +
      "</tr>"
  );

  // Handle the errors
});