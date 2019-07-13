// $(document).ready(function () {

var firebaseConfig = {
    apiKey: grabmykey(),
    authDomain: "forsaet-0.firebaseapp.com",
    databaseURL: "https://forsaet-0.firebaseio.com",
    projectId: "forsaet-0",
    storageBucket: "",
    messagingSenderId: "260809973088",
    appId: "1:260809973088:web:fcf11adadec4d424"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

database.ref().on("value", function (snapshot) {
    console.log(snapshot.numChildren());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


function wordCheck(str) {
    var wordCount = str.split(" ").length;
    console.log(wordCount);
    if (wordCount < 100) {
        $("#display-error").text("Please enter at least 100 words.");
    }
}
//$("#analyze").on("click",
function analyzeResume(content) {
    event.preventDefault();

    var natural_language;
    var personality;

    $('#loadingmodal').css('display', 'flex');
    $('#textmodal').css('display', 'none');

    // var $captcha = $('#recaptcha'),
    //     response = grecaptcha.getResponse();

    // if (response.length === 0) {
    //     $('.msg-error').text("reCAPTCHA is mandatory");
    //     if (!$captcha.hasClass("error")) {
    //         $captcha.addClass("error");
    //     }
    // } else {
    //     $('.msg-error').text('');
    //     $captcha.removeClass("error");
    //     alert('reCAPTCHA marked');
    // }




    value = content;

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
            Origin: 'https://natural-language-understanding-demo.ng.bluemix.net'
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


}


function grabmykey() {
    p1 = "AIzaSyBOUGxfIn";
    p2 = "RpMOwYNv7zTOeht_H7mDSEdF4";

    p1 = encrypt(p1, -10);
    p2 = encrypt(p2, -10);

    return p1 + "" + p2

};

function encrypt(msg, key) {
    var encMsg = "";

    for (var i = 0; i < msg.length; i++) {
        var code = msg.charCodeAt(i);

        // Encrypt only letters in 'A' ... 'Z' interval
        if (code >= 65 && code <= 65 + 26 - 1) {
            code -= 65;
            code = mod(code + key, 26);
            code += 65;
        }

        encMsg += String.fromCharCode(code);
    }

    return encMsg;
}

function mod(n, p) {
    if (n < 0)
        n = p - Math.abs(n) % p;

    return n % p;
}



// });