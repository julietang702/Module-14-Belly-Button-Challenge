
// function the populates the metadata
function demoInfo(sample)
{
    console.log(sample);
    d3.json("samples.json").then((data) => {
        //grab all metadata
        let metaData = data.metadata;
        //console.log(metaData);
        //filter based on the value of the sample
        let result = metaData.filter(sampleResult => sampleResult.id == sample)

        //console.log(result);
        //access index 0 from the array
        let resultData = result[0];
        console.log(resultData);
        //clear the metadata
        d3.select("#sample-metadata").html("");
        // object.entries to get value key pairs
        Object.entries(resultData).forEach(([key,value]) =>{
            d3.select("#sample-metadata")
            .append("h5").text(`${key}: ${value}`);
        });
    });
}
//funtion that updates the dashboard
//function that builds the graphs
function buildBarChart(sample)
{
    //console.log(sample);
    //let data = d3.json("sample.json");
    //console.log(data);
    d3.json("samples.json").then((data) => {
        //grab all of the samples
        let sampleData = data.samples;
        //console.log(sampleData);
        
        //console.log(metaData);
        //filter based on the value of the sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample)

        //console.log(result);
        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);
        // get the otu_ids, sample
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
        //build barchart
        // y ticks
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        //console.log(yticks);
        let xValues = sample_values.slice(0,10);
        //console.log(xValues);
        let textLabels = otu_labels.slice(0,10);
        //console.log(textLabels);

        let barChart= {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation:"h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };
        Plotly.newPlot("bar", [barChart], layout);


        
       
        
    });
}
// function for bubble chart
function buildBubbleChart(sample)
{
     //console.log(sample);
    //let data = d3.json("sample.json");
    //console.log(data);
    d3.json("samples.json").then((data) => {
        //grab all of the samples
        let sampleData = data.samples;
        //console.log(sampleData);
        
        //console.log(metaData);
        //filter based on the value of the sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample)

        //console.log(result);
        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);
        // get the otu_ids, sample
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
        //build bubblechart
    

        let bubbleChart= {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            title: "Bacteria Culture Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bubble", [bubbleChart], layout);


        
       
        
    });
}
 
//function that intializes the dashboard
function initialize()
{
    //let data = d3.json("samples.json");
    //console.log(data)
    // access the dropdown
    var select = d3.select("#selDataset");
    // use d3.json inorder to get the data
    d3.json("samples.json").then((data) =>  {
        let sampleNames = data.names; // made an array of just the names
        //console.log(sampleNames);
        //use for each in order to create options for each sample
        sampleNames.forEach((sample) => {
            select.append("option")
            .text(sample)
            .property("value", sample);


        });
    // when initialized, pass in the information for the first sample
        let sample1 = sampleNames[0];
    

    //call the function to build metadata
        demoInfo(sample1);
        buildBarChart(sample1);
        buildBubbleChart(sample1)
    });

}
// function that update dashboard
function optionChanged(item)
{
    //call update to metadata
    demoInfo(item);
    //call function for barchart
    buildBarChart(item);
    // call for bubble chart
    buildBubbleChart(item);
}
// call the intialize function
initialize();