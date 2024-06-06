
class RandomDataChart
{
    constructor()
    {
        // Assuming the HTML element id is 'ChartCanvas1'
        this.ctx = document.getElementById('ChartCanvas1').getContext('2d');
        
        this.chart = new Chart(this.ctx, 
        {
            type: 'line',
            data: {
                labels: Array.from({length: 10}, (_, i) => i),
                datasets: [{
                    label: 'Dynamic Data',
                    data: Array.from({length: 10}, () => Math.floor(Math.random() * 100)),
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    borderColor: 'rgba(0, 255, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                aspectRatio:1,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
            
        // Update chart every second
        setInterval(() => this.Update(), 1000); 
    }

    Update()
    {
        this.chart.data.datasets[0].data.shift();
        this.chart.data.datasets[0].data.push(Math.floor(Math.random() * 100));
        this.chart.update();
    }
}

