import React from 'react';
import './App.css';
import {Matrix} from "./Matrix";


class HammingInput extends React.Component<{}, {hammingArray: Array<any>}> {
    value: string;
    stringArray: Array<string>;
    hidden = true;
    index = 0;
    matrix : Matrix;

    data = [
        {
            label: 'Visualisation',
            data: [{

            }]
        }
    ]

    constructor(props: any) {
        super(props);
        this.keyDown = this.keyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.matrix = new Matrix();
        this.value = "";
        this.stringArray = [];
        this.state = {
            hammingArray: []
        }
    }

    keyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            if (this.value.length === 5) {
                this.stringArray.push(this.value);
                this.hidden = true;
                this.updateTable()
            } else {
                this.hidden = false;
            }
        }
    }

    updateTable() {
        if (this.stringArray.length > 1) {
            let test = this.calcHamming(this.stringArray[this.stringArray.length -2], this.stringArray[this.stringArray.length-1])
            this.setState({
                hammingArray: this.state.hammingArray.concat([test])
            })
        }
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
        return [a, b, distance]
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
                    <button onClick={() => this.matrix.randomFill(10)}>Random fill matrix </button>
                </p>
                <br/>
                <table>
                    <tr>
                        <th>String A</th>
                        <th>String B</th>
                        <th>Hemming distance</th>
                    </tr>
                        {
                            this.state.hammingArray.map(entry => (
                            <tr>
                                <td>{entry[0]}</td>
                                <td>{entry[1]}</td>
                                <td>{entry[2]}</td>
                            </tr>

                            ))}
                </table>
            </fieldset>

        );
    }
}

export default HammingInput;