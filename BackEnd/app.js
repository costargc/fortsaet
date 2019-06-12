$(document).ready(function () {
    
    function wordCheck(str) {
        var wordCount = str.split(" ").length;
        console.log(wordCount);
        if (wordCount < 200) {
            $("#display-error").text("Please enter at least 200 words.");
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