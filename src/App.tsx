import React from 'react';
import './App.css';


class HammingInput extends React.Component {
    value: string;
    hammingArray: Array<string>;
    hidden = true;

    constructor() {
        super(0);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.value = "";
        this.hammingArray = [];

    }

    handleChange(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            console.log(this.hidden);
            if (this.value.length === 5) {
                this.hammingArray.push(this.value);
                this.hidden = true;
            } else {
                this.hidden = false;
            }


            if (this.hammingArray.length > 1) {
                console.log(this.calcHamming(this.hammingArray[this.hammingArray.length -2], this.hammingArray[this.hammingArray.length-1]))
            }
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
        return distance
    }

    render() {
        return (
            <fieldset>
                <legend>Enter 5 digits:</legend>
                <input type="number" onKeyDown={this.handleChange} onChange={this.onChange} />
                <p style={{visibility: this.hidden ? 'hidden' : 'visible'}}>
                    Only 5 numbers, you dingus!
                </p>
                <br/>
                <p>
                    Press enter to add digits.
                </p>
            </fieldset>

        );
    }
}

export default HammingInput;