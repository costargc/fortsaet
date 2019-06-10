$(document).ready(function () {

    $("#analyze").on('click', function () {
        // window.location = window.location.href+"/dashboard";
        console.log("hi there");
    });

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
    var ValuesChart = {
        labels: ['value1', 'value2', 'value3', 'value4', 'value5'],
        datasets: [{
            label: 'values',

            borderWidth: 1,
            backgroundColor: [
                color('blue').alpha(0.5).rgbString(),
                color('red').alpha(0.5).rgbString(),
                color('blue').alpha(0.5).rgbString(),
                color('red').alpha(0.5).rgbString(),
                color('blue').alpha(0.5).rgbString()
            ],
            data: [
                0.2,
                -0.5,
                0.7,
                -0.1,
                0.1
            ]
        }],
    };


        var ctx = document.getElementById('Valuescanvas').getContext('2d');
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: ValuesChart,
            fontSize: 22,
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


// values chart - START
var PersonalityChart = {
    labels: ['value1', 'value2', 'value3', 'value4', 'value5'],
    datasets: [{
        label: 'values',

        borderWidth: 1,
        backgroundColor: [
            color('blue').alpha(0.5).rgbString(),
            color('red').alpha(0.5).rgbString(),
            color('blue').alpha(0.5).rgbString(),
            color('red').alpha(0.5).rgbString(),
            color('blue').alpha(0.5).rgbString()
        ],
        data: [
            0.2,
            -0.5,
            0.7,
            -0.1,
            0.1
        ]
    }],
};


    var ctx = document.getElementById('Personalitycanvas').getContext('2d');
    window.myHorizontalBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: PersonalityChart,
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


// values chart - END


// Needs chart - START
var NeedsChart = {
    labels: ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'],
    datasets: [{
        label: 'values',

        borderWidth: 1,
        backgroundColor: [
            color('blue').alpha(0.5).rgbString(),
            color('red').alpha(0.5).rgbString(),
            color('blue').alpha(0.5).rgbString(),
            color('red').alpha(0.5).rgbString(),
            color('blue').alpha(0.5).rgbString(),
            color('blue').alpha(0.5).rgbString()
        ],
        data: [
            0.2,
            -0.5,
            0.7,
            -0.1,
            0.1,
            -0.5,
        ]
    }],
};


    var ctx = document.getElementById('Needscanvas').getContext('2d');
    window.myHorizontalBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: NeedsChart,
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


// values chart - END



});