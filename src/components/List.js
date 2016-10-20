import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { getScrollTop, getWindowHeight, getScrollHeight } from '../utils/scroll.js'
import {EventBus} from '../utils/event-bus'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            list: [],
            tab: '',
            isRequest: false,
            expanded: false
        };
        // this.getTopics()
        // scroll Load
        window.onscroll = () => {
            var scrollHeight = getScrollHeight()
            var ScrollTop = getScrollTop()
            var WindowHeight = getWindowHeight()
            if (scrollHeight - (ScrollTop + WindowHeight) <= 50) {
                this.setState((prevState) => (
                    {page: prevState.page + 1}
                ));
                // this.state.page++
                this.getTopics()
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
        fetch(`https://cnodejs.org/api/v1/topics?limit=10&page=${this.state.page || 1}&tab=${this.state.tab || ''}`)
        .then(res => res.json())
        .then(res => {
            if (this.state.page === 1) {
                this.setState({
                    list: res.data,
                    isRequest: false
                });
            } else {
                this.setState((prevState) => ({
                    list: prevState.list.concat(res.data),
                    isRequest: false
                }));
            }
        })
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };
    render() {
        return (
            <div>
                {
                    this.state.list.map(x => 
                        <Card key={x.id} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                            title={x.title}
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