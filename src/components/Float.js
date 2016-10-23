import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Flight from 'material-ui/svg-icons/maps/flight';

const style = {
    marginRight: 20,
    position: 'fixed',
    right: 20,
    bottom: 20,
    opacity: 0.5
};

class Float extends Component {
    ScrollTop() {
        document.body.scrollTop = 0
    }
    render() {
        const {float} = this.props
        if (!float) {
            return null;
        }
        return (
                <FloatingActionButton secondary={true} mini={false} style={style} onClick={this.ScrollTop}>
                    <Flight />
                </FloatingActionButton>
        );
    }
}

export default Float;