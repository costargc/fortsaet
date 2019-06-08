$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBOUGxfInRpMOwYNv7zTOeht_H7mDSEdF4",
        authDomain: "forsaet-0.firebaseapp.com",
        databaseURL: "https://forsaet-0.firebaseio.com",
        projectId: "forsaet-0",
        storageBucket: "",
        messagingSenderId: "260809973088",
        appId: "1:260809973088:web:fcf11adadec4d424"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    function wordCheck (str) {
        var wordCount = str.split(" ").length;
        console.log(wordCount);
        if (wordCount < 200) {
            return $("#display-error").text("Please enter at least 200 words.");
        }
    }

    $("#analyze").on("click", function () {

        value1 = $("#cv-text-1").val();
        //console.log(value1);
        value2 = $("#cv-text-2").val();
        //console.log(value2);
        value = value1 + value2;
        //console.log(value);
        wordCheck(value);

        valueA = JSON.stringify({ features: { concepts: {}, entities: {}, keywords: {}, categories: {}, emotion: {}, sentiment: {}, semantic_roles: {}, syntax: { tokens: { lemma: true, part_of_speech: true }, sentences: true } }, text: value });
        // console.log(valueA);

        //Call to Natural Language Understanding
        $.ajax({
            type: 'POST',
            url: "https://cors-anywhere.herokuapp.com/https://natural-language-understanding-demo.ng.bluemix.net/api/analyze",
            contentType: 'application/json',
            data: valueA,

            crossOrigin: true,
            beforeSend: function (xhr) {
            },
            success: function (body) {
                console.log(body);
            },
            error: function (xhr) {
                console.log(xhr);
            },
        });

        //Call to Personality Insights
        $.ajax({
            type: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/https://personality-insights-demo.ng.bluemix.net/api/profile/text',

            dataType: 'json',
            data: {
                text: value
            },
            crossOrigin: true,
            beforeSend: function (xhr) {
            },
            success: function (body) {
            console.log(body);

            },
            error: function (xhr) { // if error occured
                console.log(xhr);
            },
            // dataType: 'html'
        });


    })



});