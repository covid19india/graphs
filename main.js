



var url = 'https://api.covid19india.org/v3/data-all.json';
var categories = [];
var data_tt_confirmed = [];
var data_tt_active = [];
var data_tt_recovered = [];
var data_tt_deceased = [];
var data_tt_tested = [];
function pusher(a, b) {
    isNaN(b) ? a.push(0) : a.push(b);
    return a;
}
fetch(url)
    .then(res => res.json())
    .then((data) => {
        for (var date in data) {
            categories.push(date);
            data_tt_confirmed.push(data[date]['TT'].total.confirmed);
            data_tt_recovered.push(data[date]['TT'].total.recovered || 0);
            data_tt_deceased.push(data[date]['TT'].total.deceased || 0);
            data_tt_tested.push(data[date]['TT'].total.tested || 0);
            data_tt_active.push(data[date]['TT'].total.confirmed
                - (data[date]['TT'].total.recovered || 0)
                - (data[date]['TT'].total.deceased || 0)
            );
        }

        console.log(data_tt_confirmed.length);
        console.log(data_tt_recovered.length);
        var options = {
            chart: {
                type: 'line'
            },
            annotations: {
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

            },
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

        var chart = new ApexCharts(document.querySelector("#chart"), options);

        chart.render();

    })
    .catch(err => { throw err });