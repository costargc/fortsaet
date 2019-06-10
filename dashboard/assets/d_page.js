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

    var ctx = document.getElementById('Valuescanvas_d').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            datasets: [
                {
                    label: "Population (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [2478, 5267, 734, 784, 433]
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



    var ctx = document.getElementById('Personalitycanvas').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
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



    var ctx = document.getElementById('Needscanvas').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
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


    // values chart - END



});