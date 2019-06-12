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

    function wordCheck(str) {
        var wordCount = str.split(" ").length;
        console.log(wordCount);
        if (wordCount < 200) {
            return $("#display-error").text("Please enter at least 200 words.");
        }
    }

    //To remove double spaces
    var regex = /  /gi
    console.log(value)

    var single = value.replace(regex, ' ')
    console.log(single)

    //To remove double words
    
//First to stringify every single word in the cv text 
var obj = { value };
var myJSON = JSON.stringify(obj);

//Then to remove double words

var uniqueList=string.split(',').filter(function(item,i,allItems){
    return i==allItems.indexOf(item);
}).join(',');

$('#output').append(uniqueList);





    $("#analyze").on("click", function () {
        var natural_language;
        var personality;

        $('#loadingmodal').css('display', 'flex');
        $('#textmodal').css('display', 'none');


        value = $("#cv-text-1").val().trim();

        wordCheck(value);

        valueA = JSON.stringify({ features: { concepts: {}, entities: {}, keywords: {}, categories: {}, emotion: {}, sentiment: {}, semantic_roles: {}, syntax: { tokens: { lemma: true, part_of_speech: true }, sentences: true } }, text: value });
        // console.log(valueA);

        //Call to Natural Language Understanding
        sessionStorage.clear();

        // had to add one ajax call inside the other in order to be able to change to the dashboard page in an syncronous way.

        $.ajax({
            type: 'POST',
            url: "https://cors-anywhere.herokuapp.com/https://natural-language-understanding-demo.ng.bluemix.net/api/analyze",
            contentType: 'application/json',
            data: valueA,

            crossOrigin: true,
            beforeSend: function (xhr) {
            },
            success: function (body) {
                // console.log(body);
                natural_language = body;
                sessionStorage.setItem('natural_language', JSON.stringify(natural_language));
                callPersonality();
            },
            error: function (xhr) {
                console.log(xhr);
                $('#loadingmodal').css('display', 'none');
                $('#textmodal').css('display', 'flex');
            },
        })

        //Call to Personality Insights
        function callPersonality() {
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
                    // console.log(body);
                    personality = body;
                    sessionStorage.setItem('personality', JSON.stringify(personality));

                    console.log(JSON.parse(sessionStorage.getItem('natural_language')));
                    console.log(JSON.parse(sessionStorage.getItem('personality')));
                    // change to dashboard page
                    window.open('./dashboard/index.html', '_self');

                },
                error: function (xhr) { // if error occured
                    console.log(xhr);
                    $('#loadingmodal').css('display', 'none');
                    $('#textmodal').css('display', 'flex');
                },
                // dataType: 'html'
            });

        }


    })



});