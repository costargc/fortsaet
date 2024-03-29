$(document).ready(function () {
    console.log("ready!");

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: grabmykey(),
        authDomain: "forsaet-0.firebaseapp.com",
        databaseURL: "https://forsaet-0.firebaseio.com",
        projectId: "forsaet-0",
        storageBucket: "",
        messagingSenderId: "260809973088",
        appId: "1:260809973088:web:fcf11adadec4d424"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    var personalityResults = JSON.parse(sessionStorage.getItem('personality'));
    var natLanguageResults = JSON.parse(sessionStorage.getItem('natural_language'));
    console.log(personalityResults);
    console.log(natLanguageResults);
    
    var persNeeds = personalityResults.needs;

    persNeeds.sort(function (a, b) {
        if (a.percentile < b.percentile) {
            return -1;
        } else if (a.percentile > b.percentile) {
            return 1;
        }
        return 0;
    });

    var largestNeeds = persNeeds.slice(persNeeds.length - 3);
    var lowestNeeds = persNeeds.slice(0, 3);

    var analysisResults = {
        categories: natLanguageResults.results.categories,
        concepts: natLanguageResults.results.concepts.slice(0, 10),
        emotions: natLanguageResults.results.emotion.document.emotion,
        entities: natLanguageResults.results.entities,
        keywords: natLanguageResults.results.keywords.slice(0, 10),
        needs: [lowestNeeds, largestNeeds],
        personality: personalityResults.personality,
        values: personalityResults.values,
    };

    database.ref().push(analysisResults);

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

});