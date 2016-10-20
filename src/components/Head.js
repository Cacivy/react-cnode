import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {EventBus} from '../utils/event-bus'

class Head extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            tabs: ['全部', '精华', '分享', '问答', '招聘'],
            tabsValue: ['', 'good', 'share', 'ask', 'job']
        };
    }

  handleChange = (value) => {
    // this.state.slideIndex = value
    this.setState({
      slideIndex: value
    });
    EventBus.emit('index', this.state.tabsValue[value])
  };
    render() {
        return (
            <div>
                <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
                >
                {
                    this.state.tabs.map((x, i) => 
                        <Tab key={i} label={x} value={i}/>
                    )
                }
                </Tabs>
            </div>
        );
    }
}

export default Head;