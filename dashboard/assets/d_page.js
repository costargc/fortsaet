$(document).ready(function () {

    naturalobj = JSON.parse(sessionStorage.getItem("natural_language"));
    // console.log(naturalobj.results.emotion.document.emotion);

    emotions_label = Object.keys(naturalobj.results.emotion.document.emotion);
    emotions_values = Object.values(naturalobj.results.emotion.document.emotion);
    emotions_values_bar = [];
    emotions_values_color = [];

    for (i = 0; i < emotions_label.length; i++) {
        emotions_values_bar.push(emotions_values[i] * 1 - 0);

        if (emotions_values[i] * 2 - 1 >= 0) {
            emotions_values_color.push('rgb(0, 0 , 255, 0.5)');
        }
        else {
            emotions_values_color.push('rgb(255, 0, 0, 0.5)');
        }

    }

    $('#top_emotion').text(emotions_label[indexOfMax(emotions_values)]);

    // console.log(emotions_label);
    // console.log(emotions_values);
    // console.log(emotions_values_bar);
    // console.log(emotions_values_color);

    // ------------

    personalityobj = JSON.parse(sessionStorage.getItem("personality"));
    // console.log(personalityobj);

    personality_label = [];
    personality_values = [];
    personality_values_bar = [];
    personality_values_color = [];

    for (i = 0; i < personalityobj.personality.length; i++) {
        personality_label.push(personalityobj.personality[i].name);
        personality_values.push(personalityobj.personality[i].percentile);
        personality_values_bar.push(personalityobj.personality[i].percentile * 2 - 1);

        if (personalityobj.personality[i].percentile * 2 - 1 >= 0) {
            personality_values_color.push('rgb(0, 0 , 255, 0.5)');
        }
        else {
            personality_values_color.push('rgb(255, 0, 0, 0.5)');
        }

    }

    $('#top_persona').text(personality_label[indexOfMax(personality_values)]);
    $('#bot_persona').text(personality_label[indexOfMin(personality_values)]);

    // console.log(personality_label);
    // console.log(personality_values);
    // console.log(personality_values_bar);
    // console.log(personality_values_color);


    needs_label = [];
    needs_values = [];
    needs_values_bar = [];
    needs_values_bar_color = [];

    for (i = 0; i < personalityobj.needs.length; i++) {
        needs_label.push(personalityobj.needs[i].name);
        needs_values.push(personalityobj.needs[i].percentile);
        needs_values_bar.push(personalityobj.needs[i].percentile * 2 - 1);

        if (personalityobj.needs[i].percentile * 2 - 1 >= 0) {
            needs_values_bar_color.push('rgb(0, 0 , 255, 0.5)');
        }
        else {
            needs_values_bar_color.push('rgb(255, 0, 0, 0.5)');
        }

    }

    $('#top_need').text(needs_label[indexOfMax(needs_values)]);
    $('#bot_need').text(needs_label[indexOfMin(needs_values)]);

    // console.log(needs_label);
    // console.log(needs_values);
    // console.log(needs_values_bar);
    // console.log(needs_values_bar_color);


    values_label = [];
    values_values = [];
    values_values_bar = [];
    values_values_bar_color = [];

    for (i = 0; i < personalityobj.values.length; i++) {
        values_label.push(personalityobj.values[i].name);
        values_values.push(personalityobj.values[i].percentile);
        values_values_bar.push(personalityobj.values[i].percentile * 2 - 1);

        if (personalityobj.values[i].percentile * 2 - 1 >= 0) {
            values_values_bar_color.push('rgb(0, 0 , 255, 0.5)');
        }
        else {
            values_values_bar_color.push('rgb(255, 0, 0, 0.5)');
        }

    }

    $('#top_values').text(values_label[indexOfMax(values_values)]);
    $('#bot_values').text(values_label[indexOfMin(values_values)]);

    // console.log(values_label);
    // console.log(values_values);
    // console.log(values_values_bar);
    // console.log(values_values_bar_color);

    // ------------



    $(function () {
        $("nav").prepend('<div class="overlay"></div>');

        $('#dismiss, .overlay').on('click', function () {
            $('#navbar-sidebar').removeClass('active');
            $('.overlay').removeClass('active');
        });

        $('#sidebarCollapse').on('click', function () {
            $('#navbar-sidebar').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('.overlay').addClass('active');

        });
    });



    var color = Chart.helpers.color;


    // values chart - START

    var ctx = document.getElementById('Valuescanvas_d').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: values_label,
            datasets: [
                {
                    backgroundColor: values_values_bar_color,
                    data: values_values
                }
            ]
        },
        options: {
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Values'
            }
        }
    });


    var ctx = document.getElementById('Valuescanvas').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: values_label,
            datasets: [{
                label: 'values',

                borderWidth: 1,
                backgroundColor: values_values_bar_color,
                data: values_values_bar
            }],
        },
        options: {

            scales: {
                xAxes: [{

                    ticks: {
                        max: 1,
                        min: -1,
                    },
                }],

            },
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Values'
            }
        }
    });



    // values chart - END


    // Personality chart - START


    var ctx = document.getElementById('Personalitycanvas_d').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: personality_label,
            datasets: [
                {
                    backgroundColor: personality_values_color,
                    data: personality_values
                }
            ]
        },
        options: {
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Personality'
            }
        }
    });
    var ctx = document.getElementById('Personalitycanvas').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: personality_label,
            datasets: [{
                label: 'values',

                borderWidth: 1,
                backgroundColor: personality_values_color,
                data: personality_values_bar
            }],
        },
        options: {

            scales: {
                xAxes: [{

                    ticks: {
                        max: 1,
                        min: -1,
                    },
                }],

            },
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Personality'
            }
        }
    });


    // Personality chart - END


    // Needs chart - START


    var ctx = document.getElementById('Needscanvas_d').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: needs_label,
            datasets: [
                {
                    backgroundColor: needs_values_bar_color,
                    data: needs_values
                }
            ]
        },
        options: {
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Needs'
            }
        }
    });
    var ctx = document.getElementById('Needscanvas').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: needs_label,
            datasets: [{
                label: 'values',

                borderWidth: 1,
                backgroundColor: needs_values_bar_color,
                data: needs_values_bar
            }],
        },
        options: {

            scales: {
                xAxes: [{

                    ticks: {
                        max: 1,
                        min: -1,
                    },
                }],

            },
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Needs'
            }
        }
    });


    // Needs chart - END






    // emotion chart - START


    var ctx = document.getElementById('Emotioncanvas_d').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: emotions_label,
            datasets: [
                {
                    backgroundColor: emotions_values_color,
                    data: emotions_values
                }
            ]
        },
        options: {
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Emotions'
            }
        }
    });
    var ctx = document.getElementById('Emotioncanvas').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: emotions_label,
            datasets: [{
                label: 'values',

                borderWidth: 1,
                backgroundColor: emotions_values_color,
                data: emotions_values_bar
            }],
        },
        options: {

            scales: {
                xAxes: [{

                    ticks: {
                        max: 1,
                        min: 0,
                    },
                }],

            },
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'none',
            },
            title: {
                fontSize: 20,
                fontFamily: "'Lato', sans-serif",
                display: true,
                text: 'Emotions'
            }
        }
    });


    // emotion chart - END



    function indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }


    function indexOfMin(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var min = arr[0];
        var minIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                minIndex = i;
                min = arr[i];
            }
        }

        return minIndex;
    }








});