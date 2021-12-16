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

        

        console.log("demoArray:");
        console.log(demoArray);

            //populate the Demographic info section
        



        let demo = d3.select("#sample-metadata");
        
        demo.selectAll("div").remove();
       Object.entries(demoArray[0]).forEach(([key, value]) => demo.append("div").text(`${key}: ${value}`));
        
    });


}

function buildGauge(sampleId){
    console.log(`SHOW DEMGRAPHIC ID (${sampleId})`)
    d3.json("samples.json").then(data=> {
        //console.log(data);
        let samples = data.samples;
        let sampleArray = samples.filter(s => s.id === sampleId);
        let sampleResult = sampleArray[0];

        let demos = data.metadata;
        let demoArray = demos.filter(s => s.id === parseInt(sampleId));

        let washFrq = demoArray[0].wfreq

        console.log("demoArray:");
        console.log(demoArray);

        console.log("demoArray wfreq:");
        console.log(washFrq);

        //populate the Demographic info section
        



        //let demo = d3.select("#gauge");
        
        //demo.selectAll("div").remove();
       //Object.entries(demoArray[0]).forEach(([key, value]) => demo.append("div").text(`${key}: ${value}`));
      
       var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: washFrq,
          title: { text: "Belly Button Scrubs per Week" },
          label: { text: "Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number", //+delta",
          //delta: { reference: 380 },
          gauge: {
            axis: { range: [null, 9], dtick: 1},

            steps: [
              { range: [0, 2], color: "salmon" },
              { range: [2, 4], color: "yellow" },
              { range: [4, 9], color: "chartreuse" }
            ],
            threshold: {
              line: { color: "purple", width: 4 },
              thickness: 0.75,
              value: washFrq
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
    });


}




// optionChanged gets called automatically when the dropdown selector changes
function optionChanged(id) {
    console.log(`optionChanged ${id}`); 

    DrawBarchart(id);
    DrawBubblechart(id);
    buildDemograph(id);
    buildGauge(id);
}

// optionChanged();







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
        buildGauge(sampleId);

        



    });





}


//the below is basically the same code as in the html line 25....
//....you would have to pass in the id to optionChanged here as well

//d3.select("#selDataset").on("change",optionChanged);



InitDashboard();


