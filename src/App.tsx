import React from 'react';
import './App.css';
import ApexCharts from 'apexcharts'


class HammingInput extends React.Component<{}, {hammingArray: Array<any>, stringArray: Array<string>}> {
    value: string;
    hidden = true;
    index = 0;
    chart: ApexCharts | undefined


    constructor(props: any) {
        super(props);
        this.keyDown = this.keyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.value = "";
        this.state = {
            hammingArray: [],
            stringArray: []
        }
    }

    keyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            if (this.value.length === 5) {
                this.hidden = true;
                this.updateTable()
            } else {
                this.hidden = false;
            }
        }
    }

    renderChart() {
        if(this.chart?.paper() !== undefined) {
            this.chart.destroy();
        }
        this.chart = new ApexCharts(document.querySelector("#chart"), this.createOptions());
        this.chart.render();
    }

    updateTable() {
        this.setState({
            stringArray: this.state.stringArray.concat(this.value)
        })
    }

    createOptions() {
        let series = []
        for (let x = 0; x < this.state.stringArray.length; x++) {
            let data = []
            for (let y = 0; y < this.state.stringArray.length; y++) {
                data.push({
                    x: this.state.stringArray[y],
                    y: this.calcHamming(this.state.stringArray[y], this.state.stringArray[x])
                })
            }
            series.push({
                name: this.state.stringArray[x],
                data: data
            })
        }
        return {
            chart: {
                type: "heatmap",
                toolbar: {
                    show: false
                },
            },
            series: series
        };
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.value = e.target.value;
    }

    calcHamming(a:string, b:string) {
        let distance = 0;
        for (let i = 0; i < a.length; i += 1) {
            if (a[i] !== b[i]) {
                distance += 1;
            }
        }
        return distance
    }

    render() {
        return (
            <fieldset>
                <legend>Enter 5 digits:</legend>
                <input type="number" onKeyDown={this.keyDown} onChange={this.onChange} />
                <p style={{visibility: this.hidden ? 'hidden' : 'visible'}}>
                    Only 5 numbers, you dingus!
                </p>
                <br/>
                <p>
                    Press enter to add digits.
                </p>
                <p>
                    <button onClick={() => this.renderChart()}>Generate heatmap </button>
                </p>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th>Array's with strings:</th>
                    </tr>
                        {
                            this.state.stringArray.map(entry => (
                            <tr>
                                <td>{entry}</td>
                            </tr>

                            ))}
                    </tbody>
                </table>
                <div id="chart">

                </div>
            </fieldset>

        );
    }
}

export default HammingInput;