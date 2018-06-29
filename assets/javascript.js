var config = {
    apiKey: "AIzaSyA6tQzBR3WbFTwIc-aWSRoOz0XAlAM5cbY",
    authDomain: "train-times-homework.firebaseapp.com",
    databaseURL: "https://train-times-homework.firebaseio.com",
    projectId: "train-times-homework",
    storageBucket: "train-times-homework.appspot.com",
    messagingSenderId: "922394169323"
};

firebase.initializeApp(config);
var database = firebase.database();



$("#submit").click(function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        trainFrequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#train-frequency").val("")
    
});

// function meh() {
//     // set the page to update the train times according to new moment.js logic
// };
// var constantRefresh = setInterval(meh, 5000);


database.ref().on("child_added", function(snapshot) {
    var retrievedName = snapshot.val().trainName;
    var retrievedDestination = snapshot.val().destination;
    var retrievedFirst = snapshot.val().firstTrain;
    var retrievedFrequency = snapshot.val().trainFrequency;
    var nextArrival;
    var minutesAway;

    var convertedFirst = moment(retrievedFirst, "HH:mm");
    var tDiff = moment().diff(convertedFirst, "minutes");


    if (tDiff > 0) {
        var tRemainder = tDiff % retrievedFrequency;
        var tMinutesUntil = retrievedFrequency - tRemainder;

        minutesAway = tMinutesUntil;

        nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
        console.log(tDiff + " " + tRemainder + " " + tMinutesUntil);
    }
    else if (tDiff = 0) {
         minutesAway = "Here";
         nextArrival = "Now Boarding";
    }
    else {
        nextArrival = retrievedFirst;
        minutesAway = convertedFirst.diff(moment(), "minutes");
    }


    $("tbody").append("<tr><td>" + retrievedName + "</td><td>" + retrievedDestination + "</td><td>" + retrievedFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});