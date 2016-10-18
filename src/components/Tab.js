import React, {Component} from 'react';
import './Tab.css'

class Tab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            tabs: ['全部', '精华', '分享', '问答', '招聘']
        };
    }
   
    check(i) {
        this.setState((prevState) => ({
            index: i
        }));
    }

    render() {
        var lineStyles = {
            width: 100 / this.state.tabs.length + '%',
            marginLeft: this.state.index * 20 + '%'
        }
        return (
            <div className="tab">
                <ul>
                {this.state.tabs.map((x, i) => 
                    <li key={i} onClick={this.check.bind(this, i)}>{x}</li>
                )}
                </ul>
                <div className="line" style={lineStyles}></div>
            </div>
        );
    }
}

export default Tab;