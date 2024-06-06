class ParsedCSVDataChart
{
    constructor()
    {
        this.DisplayData();
    }

    async DisplayData()
    {
        const data = await this.GetData();
        this.ChartData(data);
    }

    // Data from: https://data.giss.nasa.gov/gistemp/
    // Mean from: https://earthobservatory.nasa.gov/world-of-change/

    async GetData()
    {
        // See Fetch API, Response: https://developer.mozilla.org/en-US/docs/Web/API/Response
        const response = await fetch('./DataSets/Test.csv');
        // There are different data streams that might come in like a blob, json, an array buffer and text.
        // We do the parsing of the raw text manually so we want to receive it as text using the text() function:
        const data = await response.text();
        // Log the data to the console
        // console.log(data);

        // There are a variety of JavaScript libraries that have functions that will parse a CSV for you. D3 which is a
        // JavaScript library for data visualization, the p5 js library has a loadTable() function which will parse 
        // the CSV for you, and there are many others. 
        // This data however is simple enough to parse manually using the String.split() function which can split 
        // strings up into different elements of an array. 
        // See String.prototype.split() API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split

        // First let's call split by line break to break the rows of the string up into elements:
        // const rows = data.split('\n');
        // console.log(rows);
        
        // We don't really need the first row of the array because that information is only important to us to know 
        // what the data is, but for parsing we don't actually need it.
        // We can use the Array.prototype.slice() function to 'slice' off a portion of the array by copying only a 
        // portion of the array from beginning to end.
        // See Array.prototype.slice() API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        const rows = data.split('\n').slice(1);
        // console.log(rows);

        // Next step is splitting the rows into all of the fields. For what we're doing we only need the year which 
        // is the first field and the difference from the mean temperature globally which is the second field.
        // We can use a for each loop to itterate through all of the rows.

        // Using the ES 6 JavaScript arrow syntax and the hicher order .forEach(i => {}) function, which allows us to apply 
        // something to every element in the array, and each element of the array is represented by the row variable:
        let years = [];
        let temps = [];
        rows.forEach(element => 
        {
            const row  = element.split(','); // Split the row by commas.
            // console.log(row);

            years.push(row[0]);             // Store row[0] which is the year data into a constant.
            temps.push(row[1]);             // Store row[1] which is the mean temperature into a constant.
            // console.log(year, temp);
        });

        // Create a DataObject class for storing labels and values as a single object which can be passed around easily.
        class DataObject
        {
            constructor (xLabels, yValues)
            {  
                this.xLabels = xLabels;
                this.yValues = yValues;
            }
        }

        return new DataObject(years, temps);
    }

    async ChartData(data)
    {
        // console.log(data.yValues);

        const ctx = document.getElementById('ChartCanvas2'); // context

        new Chart(ctx, 
        {
            type: 'bar',
            data: 
            {
                labels: data.xLabels,
                datasets: 
                [
                    {
                        label: 'Global Average Temperature',
                        data: data.yValues,
                        borderWidth: 1
                    }
                ]
            },
            options: 
            {
                aspectRatio: 1,
                scales: 
                {
                    y: 
                    {
                        beginAtZero: true
                    }
                }
            }
        });
    }
            
}