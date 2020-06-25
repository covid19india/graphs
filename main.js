var url_timeseries = 'https://api.covid19india.org/v3/timeseries.json';
var categories = [];
var data_tt_confirmed = [];
var data_tt_active = [];
var data_tt_recovered = [];
var data_tt_deceased = [];
var data_tt_tested = [];

var categories_delta = [];
var data_tt_confirmed_delta = [];
var data_tt_active_delta = [];
var data_tt_recovered_delta = [];
var data_tt_deceased_delta = [];
var data_tt_tested_delta = [];
var annotations = {
    xaxis: [
        {
            x: "2020-03-25",
            strokeDashArray: 0,
            borderColor: '#775DD0',
            label: {
                borderColor: '#775DD0',
                // style: {
                //     color: '#fff',
                //     background: '#775DD0',
                // },
                text: 'Lockdown Phase 1',
            }
        },
        {
            x: "2020-04-15",
            borderColor: '#775DD0',
            label: {
                borderColor: '#775DD0',
                text: 'Lockdown Phase 2',
            }
        },
        {
            x: "2020-05-04",
            borderColor: '#775DD0',
            label: {
                borderColor: '#775DD0',
                text: 'Lockdown Phase 3',
            }
        },
        {
            x: "2020-05-18",
            borderColor: '#775DD0',
            label: {
                borderColor: '#775DD0',
                text: 'Lockdown Phase 4',
            }
        },
        {
            x: "2020-06-01",
            borderColor: '#775DD0',
            label: {
                borderColor: '#775DD0',
                text: 'Lockdown Phase 5',
            }
        }
    ],

};


fetch(url_timeseries)
    .then(res => res.json())
    .then((data) => {

        for (var date in data["TT"]) {
            console.log(date);
            categories.push(date);

            data_tt_confirmed_delta.push(data["TT"][date].delta.confirmed || 0);
            data_tt_recovered_delta.push(data["TT"][date].delta.recovered || 0);
            data_tt_deceased_delta.push(data["TT"][date].delta.deceased || 0);
            data_tt_tested_delta.push(data["TT"][date].delta.tested || 0);
            // data_tt_active_delta.push(data["TT"][date].delta.confirmed || 0);

            data_tt_confirmed.push(data["TT"][date].total.confirmed || 0);
            data_tt_recovered.push(data["TT"][date].total.recovered || 0);
            data_tt_deceased.push(data["TT"][date].total.deceased || 0);
            data_tt_tested.push(data["TT"][date].total.tested || 0);
            data_tt_active.push(data["TT"][date].total.confirmed
                - (data["TT"][date].total.recovered || 0)
                - (data["TT"][date].total.deceased || 0)
            );

        }


        var options_daily = {
            chart: {
                type: 'line',
                // zoom:{
                //     type: 'xy'
                // },
            },
            annotations: {
                xaxis: annotations.xaxis,
                points: [
                    {
                        x: '2020-06-16',
                        y: 2004,
                        marker: {
                            size: 8,
                            fillColor: '#fff',
                            strokeColor: 'red',
                            radius: 2,
                            cssClass: 'apexcharts-custom-class'
                        },
                        label: {
                            borderColor: '#FF4560',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },

                            text: 'Backdated deaths reported by MH',
                        }
                    }, {
                        x: '2020-05-29',
                        y: 11735,
                        marker: {
                            size: 8,
                            fillColor: '#fff',
                            strokeColor: 'green',
                            radius: 2,
                            cssClass: 'apexcharts-custom-class'
                        },
                        label: {
                            borderColor: '#28a745',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#28a745',
                            },

                            text: 'Mass discharge by MH',
                        }
                    }

                ]
            },
            colors: ['#ff073a', '#28a745', '#6c757d', '#261ebd'],
            series: [
                {
                    name: 'Confirmed',
                    data: data_tt_confirmed_delta,
                },
                {
                    name: 'Recovered',
                    data: data_tt_recovered_delta
                },
                {
                    name: 'Deceased',
                    data: data_tt_deceased_delta
                },
                {
                    name: 'Tested',
                    data: data_tt_tested_delta
                },
            ],
            xaxis: {
                categories: categories
            }
        }

        var options_cumulative = {
            chart: {
                type: 'line',
                // zoom:{
                //     type: 'xy'
                // },
            },
            annotations: annotations,
            colors: ['#ff073a', '#007bff', '#28a745', '#6c757d', '#261ebd'],
            series: [
                {
                    name: 'Confirmed',
                    data: data_tt_confirmed,
                },
                {
                    name: 'Active',
                    data: data_tt_active
                },
                {
                    name: 'Recovered',
                    data: data_tt_recovered
                },
                {
                    name: 'Deceased',
                    data: data_tt_deceased
                },
                {
                    name: 'Tested',
                    data: data_tt_tested
                },

            ],
            xaxis: {
                categories: categories
            }
        }

        var chart_cumulative = new ApexCharts(document.querySelector("#chart-cumulative"), options_cumulative);
        chart_cumulative.render();


        var chart_daily = new ApexCharts(document.querySelector("#chart-daily"), options_daily);
        chart_daily.render();

    })
    .catch(err => { throw err });