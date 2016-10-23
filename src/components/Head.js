import React, {Component, PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {EventBus} from '../utils/event-bus'

class Head extends Component {

    static propTypes = {
        tab: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }


  handleChange = (value) => {
    const {tab, actions} = this.props
    actions.updateIndex(value)
    // 延迟，等待动画完成
    EventBus.emit('index', tab.tabsValue[value])
  };
  render() {
      const {tab} = this.props
        return (
            <div>
                <Tabs
                onChange={this.handleChange}
                value={tab.slideIndex}
                >
                {
                    tab.tabs.map((x, i) => 
                        <Tab key={i} label={x} value={i}/>
                    )
                }
                </Tabs>
            </div>
        );
    }
}

export default Head;