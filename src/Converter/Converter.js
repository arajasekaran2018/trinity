import React, {Component} from 'react';
import Axios from 'axios';

class Converter extends Component {
    state = {
        fromValue: 1,
        toValue: 0,
        fromList: [{key: 1, val: 'USD'}, {key: 2, val: 'CAD'}, {key: 3, val: 'GBP'}, {key: 4, val: 'EUR'}],
        toList: [{key: 1, val: 'USD'}, {key: 2, val: 'CAD'}, {key: 3, val: 'GBP'}, {key: 4, val: 'EUR'}],
        fromCurrency: 'USD',
        toCurrency: 'CAD'
    }

    instance = Axios.create({
        baseURL: 'https://api.frankfurter.app/',
    });

    handleAPICall = (amount, from, to) => {
        this.instance.get('/latest', {
            params: {
                amount: amount,
                from: from,
                to: to
            }
        })
        .then(res => {
            this.setState({toValue: res.data.rates[this.state.toCurrency]})
        });
    }
    componentDidMount = () => {
        this.handleAPICall(this.state.fromValue, this.state.fromCurrency, this.state.toCurrency);
    }
    handleFromCurr = (e) => {
        this.setState({fromCurrency: e.target.value});
        if (e.target.value.length > 0){
            this.handleAPICall(this.state.fromValue, e.target.value, this.state.toCurrency);
        }        
    }
    handleToCurr = (e) => {
        this.setState({toCurrency: e.target.value});
        this.handleAPICall(this.state.fromValue, this.state.fromCurrency, e.target.value);
    }    
    handleFromInput = (e) => {        
        this.setState({fromValue: e.target.value});
        if (e.target.value.length > 0){
            this.handleAPICall(e.target.value, this.state.fromCurrency, this.state.toCurrency);
        } else {
            this.setState({toValue: e.target.value});
        }
    }
    handleToInput = (e) => {
        this.setState({toValue: e.target.value});
    }

    render(){
        let fromValidOptions = this.state.fromList.filter(item => item.val !== this.state.toCurrency); 
        let fromCurrOptions = fromValidOptions.map(
            (data) => <option key={data.key} value={data.val}>
                {data.val}
            </option>
        )
        let toValidOptions = this.state.toList.filter(item => item.val !== this.state.fromCurrency); 
        let toCurrOptions = toValidOptions.map(
            (data) => <option key={data.key} value={data.val}>
                {data.val}
            </option>
        )
        return(
            <div>
                <p>
                    <input onChange={this.handleFromInput} value={this.state.fromValue}/>
                    <select onChange={this.handleFromCurr} value={this.state.fromCurrency}>
                        {fromCurrOptions}
                    </select>
                </p>
                <p>
                    <input onChange={this.handleToInput} value={this.state.toValue}/>
                    <select onChange={this.handleToCurr} value={this.state.toCurrency}>
                        {toCurrOptions}
                    </select>
                </p>
            </div>
        )
    }
}

export default Converter;