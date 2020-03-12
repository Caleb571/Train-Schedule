// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-6XRcBUk9MoJe1DAv3ygXn7_VHfYecXs",
    authDomain: "train-schedule-e9c9d.firebaseapp.com",
    databaseURL: "https://train-schedule-e9c9d.firebaseio.com",
    projectId: "train-schedule-e9c9d",
    storageBucket: "train-schedule-e9c9d.appspot.com",
    messagingSenderId: "168497295031",
    appId: "1:168497295031:web:362a18b19317ab9e5b2732",
    measurementId: "G-TXB30M1GBM"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var dataRef = firebase.database();


//intial values 
var trainStation = ""; 
var trainId = 0;
var trainDest = "";
var firstDept = 0;
var trainFrequency = $("#train-frequency").val().trim();
var arrivalTime;
var arrivalCountDown;
var trainPlatform = "";



$("#addTrain").on("click", function (event) {
    event.preventDefault();

    console.log("did i get clicked ");
    //store all values
    trainStation = $("#train-station").val().trim();
    trainId = $("#train-id").val().trim();
    trainDest = $("#train-destination").val().trim();
    firstDept = $("#first-departure").val().trim();
    arrivalTime = currentTime;
    arrivalCountDown = currentTime;
    trainPlatform = $("#train-platform").val().trim();

    //code for the push
    dataRef.ref().push({

        trainStation: trainStation,
        trainId: trainId,
        trainDest: trainDest,
        firstDept: firstDept,
        trainPlatform: trainPlatform,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});

dataRef.ref().on("child_added", function (childSnapshot) {




    // full list of items to the wall
    $('#train-schedule-body').append(
        '<tr>' +
        '<td>' + childSnapshot.val().trainStation + '</td>' +
        '<td>' + childSnapshot.val().trainId + '</td>' +
        '<td>' + childSnapshot.val().trainDest + '</td>' +
        '<td>' + childSnapshot.val().arrivalTime + '</td>' +
        '<td>' + childSnapshot.val().arrivalCountDown + '</td>' +
        '<td>' + childSnapshot.val().stationPlatform + '</td>' +
        
        '</tr>'
    );

    // Handle the errors
},);