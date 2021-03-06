import React, {Component, PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { getScrollTop, getWindowHeight, getScrollHeight } from '../utils/scroll.js'
import {EventBus} from '../utils/event-bus'
import './List.css'

class List extends Component {

    static propTypes = {
        tab: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            list: [],
            tab: '',
            isRequest: false,
            expanded: false
        };
        // scroll Load
        window.onscroll = () => {
            var scrollHeight = getScrollHeight()
            var ScrollTop = getScrollTop()
            var WindowHeight = getWindowHeight()
            if (scrollHeight - (ScrollTop + WindowHeight) <= 250) {
                this.setState((prevState) => (
                    {page: prevState.page + 1}
                ));
                // this.state.page++
                this.getTopics()
            }
            const {float, actions} = this.props
            if (ScrollTop > WindowHeight && !float) {
			    actions.updateFloat(true)
            } else if (ScrollTop < WindowHeight && float) {
                actions.updateFloat(false)
            }
        }
        EventBus.on('index', (tab) => {
            this.setState({
                page: 1,
                tab: tab
            }, () => {
                this.getTopics()
            })
        })
    }

    componentDidMount() {
        this.getTopics()
    }

    getTopics() {
        if (this.state.isRequest) {
            return
        }
        // this.state.isRequest = true
        this.setState({
            isRequest: true
        })
        let start = new Date()
        fetch(`https://cnodejs.org/api/v1/topics?limit=15&page=${this.state.page || 1}&tab=${this.state.tab || ''}`)
        .then(res => res.json())
        .then(res => {
            if (this.state.page === 1) {
                if (!this.state.list.length) {
                    this.setState({
                        list: res.data,
                        isRequest: false
                    });
                } else {
                    let end = new Date()
                    let delay = 1007 - (end-start)/1000
                    setTimeout(() => {
                        this.setState({
                            list: res.data,
                            isRequest: false
                        });
                    }, delay);
                }
                
            } else {
                this.setState((prevState) => ({
                    list: prevState.list.concat(res.data),
                    isRequest: false
                }));
            }
        })
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded : expanded});
    };
    render() {
        const {tab} = this.props
        const getTip = (top, good, xtab, title) => {
            let tip = '置顶'
            let className = ''
            if (top) {
                tip = '置顶'
                className = 'tip_top'
            } else if (good) {
                tip = '精华'
                className = 'tip_top'
            } else if (xtab) {
                tip = tab.tabs[tab.tabsValue.indexOf(xtab)]
                className = 'tip_default'
            }
            return <span><span className={className}>{tip}</span><span className="title">{' ' + title}</span></span>
        }
        return (
            <div>
                {
                    this.state.list.map((x, i) => 
                        <Card key={x.id} className="card" onExpandChange={this.handleExpandChange}>
                            <CardHeader
                            title={getTip(x.top, x.good, x.tab, x.title)}
                            subtitle={x.author.loginname}
                            avatar={x.author.avatar_url}
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                            if (this.state.expanded) {
                                <CardText expandable={true}>
                                    <div dangerouslySetInnerHTML={{__html: x.content}}></div>
                                </CardText>
                            }
                        </Card>
                    )
                }
            </div>
        );
    }
}

export default List;