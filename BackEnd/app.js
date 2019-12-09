$(document).ready(function () {

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

    $("#analyze").on("click", function () {
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




        value = $("#cv-text-1").val();

        // wordCheck(value);

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

                // dataType: 'application/json',
                // headers: {
                // },

                // data: "&content=For+more+than+twenty+years+past+I+have+been+paying+special+attention+to+the+question+of+Health.+While+in+England%2C+I+had+to+make+my+own+arrangements+for+food+and+drink%2C+and+I+can+say%2C+therefore%2C+that+my+experience+is+quite+reliable.+I+have+arrived+at+certain+definite+conclusions+from+that+experience%2C+and+I+now+set+them+down+for+the+benefit+of+my+readers.%0A%0AAs+the+familiar+saying+goes%2C+%E2%80%98Prevention+is+better+than+cure.%E2%80%99+It+is+far+easier+and+safer+to+prevent+illness+by+the+observance+of+the+laws+of+health+than+to+set+about+curing+the+illness+which+has+been+brought+on+by+our+own+ignorance+and+carelessness.+Hence+it+is+the+duty+of+all+thoughtful+men+to+understand+aright+the+laws+of+health%2C+and+the+object+of+the+following+pages+is+to+give+an+account+of+these+laws.+We+shall+also+consider+the+best+methods+of+cure+for+some+of+the+most+common+diseases.%0A%0AAs+Milton+says%2C+the+mind+can+make+a+hell+of+heaven+or+a+heaven+of+hell.+So+heaven+is+not+somewhere+above+the+clouds%2C+and+hell+somewhere+%5BPg+2%5D+underneath+the+earth!+We+have+this+same+idea+expressed+in+the+Sanskrit+saying%2C+Mana+%C3%AAva+Manushayan%C3%A2m+K%C3%A2ranam+Bandha+Mokshayoh%E2%80%94man%E2%80%99s+captivity+or+freedom+is+dependant+on+the+state+of+his+mind.+From+this+it+follows+that+whether+a+man+is+healthy+or+unhealthy+depends+on+himself.+Illness+is+the+result+not+only+of+our+actions+but+also+of+our+thoughts.+As+has+been+said+by+a+famous+doctor%2C+more+people+die+for+fear+of+diseases+like+small-pox%2C+cholera+and+plague+than+out+of+those+diseases+themselves.%0A%0AIgnorance+is+one+of+the+root-causes+of+disease.+Very+often+we+get+bewildered+at+the+most+ordinary+diseases+out+of+sheer+ignorance%2C+and+in+our+anxiety+to+get+better%2C+we+simply+make+matters+worse.+Our+ignorance+of+the+most+elementary+laws+of+health+leads+us+to+adopt+wrong+remedies+or+drives+us+into+the+hands+of+the+veriest+quacks.+How+strange+(and+yet+how+true)+it+is+that+we+know+much+less+about+things+near+at+hand+than+things+at+a+distance.+We+know+hardly+anything+of+our+own+village%2C+but+we+can+give+by+rote+the+names+of+the+rivers+and+mountains+of+England!+We+take+so+much+trouble+to+learn+the+names+of+the+stars+in+the+sky%2C+while+we+hardly+think+it+worth+while+to+know+the+things+that+are+in+our+own+homes!+We+never+care+a+jot+for+the+splendid+pageantry+of+Nature+before+our+very+eyes%2C+while+we+are+so+anxious+to+witness+the+%5BPg+3%5D+puerile+mummeries+of+the+theatre!+And+in+the+same+way%2C+we+are+not+ashamed+to+be+ignorant+of+the+structure+of+our+body%2C+of+the+way+in+which+the+bones+and+muscles%2C+grow%2C+how+the+blood+circulates+and+is+rendered+impure%2C+how+we+are+affected+by+evil+thoughts+and+passions%2C+how+our+mind+travels+over+illimitable+spaces+and+times+while+the+body+is+at+rest%2C+and+so+on.+There+is+nothing+so+closely+connected+with+us+as+our+body%2C+but+there+is+also+nothing+perhaps+of+which+our+ignorance+is+so+profound%2C+or+our+indifference+so+complete.%0A%0AIt+is+the+duty+of+every+one+of+us+to+get+over+this+indifference.+Everyone+should+regard+it+as+his+bounden+duty+to+know+something+of+the+fundamental+facts+concerning+his+body.+This+kind+of+instruction+should+indeed+be+made+compulsory+in+our+schools.+At+present%2C+we+know+not+how+to+deal+with+the+most+ordinary+scalds+and+wounds%3B+we+are+helpless+if+a+thorn+runs+into+our+foot%3B+we+are+beside+ourselves+with+fright+and+dismay+if+we+are+bitten+by+an+ordinary+snake!+Indeed%2C+if+we+consider+the+depth+of+our+ignorance+in+such+matters%2C+we+shall+have+to+hang+down+our+heads+in+shame.+To+assert+that+the+average+man+cannot+be+expected+to+know+these+things+is+simply+absurd.+The+following+pages+are+intended+for+such+as+are+willing+to+learn.%0A%0AI+do+not+pretend+that+the+facts+mentioned+by+me+have+not+been+said+before.+But+my+readers+will+%5BPg+4%5D+find+here+in+a+nutshell+the+substance+of+several+books+on+the+subject.+I+have+arrived+at+my+conclusions+after+studying+these+books%2C+and+after+a+series+of+careful+experiments.+Moreover%2C+those+who+are+new+to+this+subject+will+also+be+saved+the+risk+of+being+confounded+by+the+conflicting+views+held+by+writers+of+such+books.+One+writer+says+for+instance%2C+that+hot+water+is+to+be+used+under+certain+circumstances%2C+while+another+writer+says+that%2C+exactly+under+the+same+circumstances%2C+cold+water+is+to+be+used.+Conflicting+views+of+this+kind+have+been+carefully+considered+by+me%2C+so+that+my+readers+may+rest+assured+of+the+reliability+of+my+own+views.%0A%0AWe+have+got+into+the+habit+of+calling+in+a+doctor+for+the+most+trivial+diseases.+Where+there+is+no+regular+doctor+available%2C+we+take+the+advice+of+mere+quacks.+We+labour+under+the+fatal+delusion+that+no+disease+can+be+cured+without+medicine.+This+has+been+responsible+for+more+mischief+to+mankind+than+any+other+evil.+It+is+of+course%2C+necessary+that+our+diseases+should+be+cured%2C+but+they+cannot+be+cured+by+medicines.+Not+only+are+medicines+merely+useless%2C+but+at+times+even+positively+harmful.+For+a+diseased+man+to+take+drugs+and+medicines+would+be+as+foolish+as+to+try+to+cover+up+the+filth+that+has+accumulated+in+the+inside+of+the+house.+The+more+we+cover+up+the+filth%2C+the+%5BPg+5%5D+more+rapidly+does+putrefaction+go+on.+The+same+is+the+case+with+the+human+body.+Illness+or+disease+is+only+Nature%E2%80%99s+warning+that+filth+has+accumulated+in+some+portion+or+other+of+the+body%3B+and+it+would+surely+be+the+part+of+wisdom+to+allow+Nature+to+remove+the+filth%2C+instead+of+covering+it+up+by+the+help+of+medicines.+Those+who+take+medicines+are+really+rendering+the+task+of+Nature+doubly+difficult.+It+is%2C+on+the+other+hand%2C+quite+easy+for+us+to+help+Nature+in+her+task+by+remembering+certain+elementary+principles%2C%E2%80%94by+fasting%2C+for+instance%2C+so+that+the+filth+may+not+accumulate+all+the+more%2C+and+by+vigorous+exercise+in+the+open+air%2C+so+that+some+of+the+filth+may+escape+in+th"
                // ,
                data: {
                    sourceType: 'text',
                    acceptLanguage: 'en',
                    rawScores: false,
                    consumptionPreferences: true,
                    content: value,
                    contentType: 'text/plain',
                    contentLanguage: 'en'
                },

                crossOrigin: true,
                beforeSend: function (xhr) {
                    // console.log(value.toString(), value);
                },
                success: function (body) {
                    // console.log(body);
                    personality = body;
                    sessionStorage.setItem('personality', JSON.stringify(personality.result));

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