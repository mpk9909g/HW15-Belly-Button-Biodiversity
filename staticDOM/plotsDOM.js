// Much of this code was taken from instructor Dom office hours 12/11/2021

console.log("this is Dom's plots deomstration.js");

function DrawBarchart(sampleId) {
    console.log(`'DrawBarchart(${sampleId})`);

    d3.json("samples.json").then(data=> {
        //console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result);


        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;



        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {
              l: 80,
              r: 80,
              t: 80,
              b: 80
            }
          };


        Plotly.newPlot("bar", barArray, barLayout)
    });
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
    d3.json("samples.json").then(data=> {
        //console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result);


        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let markerSize = result.sample_values;
        let markerColor = result.otu_ids;



        let trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            text: otu_labels,
            marker: {
                color: markerColor,
                size: markerSize
              },
            type: "bubble"
        };

        let plotData = [trace1];

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {
                l: 80,
                r: 80,
                t: 80,
                b: 80
            },
            // showlegend: false,
            // height: 600,
            // width: 600
        };


        Plotly.newPlot("bubble", plotData, bubbleLayout)
    });
}



function buildDemograph(sampleId){
    console.log(`SHOW DEMGRAPHIC ID (${sampleId})`)
    d3.json("samples.json").then(data=> {
        //console.log(data);
        let samples = data.samples;
        let sampleArray = samples.filter(s => s.id === sampleId);
        let sampleResult = sampleArray[0];

        let demos = data.metadata;
        let demoArray = demos.filter(s => s.id === parseInt(sampleId));
        // let demoResult = demoArray[0];

        // console.log("sampleId:");
        // console.log(sampleId);
        // console.log("samples:");
        // console.log(samples);
        // console.log("sampleArray:");
        // console.log(sampleArray);
        // console.log("sampleResult:");
        // console.log(sampleResult);


        // console.log("demos:");
        // console.log(demos);
        console.log("demoArray:");
        console.log(demoArray);
        // console.log("demoResult:");
        // console.log(demoResult);

        //populate the Demographic info section
        



        let demo = d3.select("#sample-metadata");
        
        demo.selectAll("div").remove();
       Object.entries(demoArray[0]).forEach(([key, value]) => demo.append("div").text(`${key}: ${value}`));
        
    });


}

function optionChanged(id) {
    console.log(`optionChanged ${id}`);

    DrawBarchart(id);
    DrawBubblechart(id);
    buildDemograph(id);
}

optionChanged();







function InitDashboard()
{
    console.log("Initializing Dashboard");

    let selector = d3.select("#selDataset");


    d3.json("samples.json").then(data=> {

        //Put the sample id's in the drop down
        let sampleNames = data.names;

        
        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        let sampleId = sampleNames[0];
        // console.log("Intial sampleId:");
        // console.log(sampleId);

        DrawBarchart(sampleId);
        DrawBubblechart(sampleId);
        buildDemograph(sampleId);

        



    });





}

InitDashboard();


