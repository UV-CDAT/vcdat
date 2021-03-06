import React, { Component } from 'react'
import PropTypes from 'prop-types'
import widgets from 'vcs-widgets'
import $ from 'jquery'
import {Modal, Button} from 'react-bootstrap'

class GraphicsMethodEditor extends Component {
    constructor(props){
        super(props)
        this.state = {
            workingGraphicsMethod: $.extend({}, this.props.graphicsMethod)
        }
        this.updateGraphicsMethod = this.updateGraphicsMethod.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            workingGraphicsMethod: $.extend({}, nextProps.graphicsMethod)
        });
    }

    updateGraphicsMethod(gm) {
        const p = $.extend({}, gm);
        this.setState({"workingGraphicsMethod": p})
    }

    render() {
        var GMForm = widgets.GMEdit;
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.graphicsMethod.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GMForm colormaps={this.props.colormaps}
                            graphicsMethod={this.state.workingGraphicsMethod}
                            updateGraphicsMethod={this.updateGraphicsMethod} />
                </Modal.Body>
                <Modal.Footer>
                        <Button
                            bsStyle="primary"
                            onClick={() => {
                                this.props.updateGraphicsMethod(this.state.workingGraphicsMethod); this.props.onHide() 
                            }}>Save
                        </Button>
                        <Button onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

GraphicsMethodEditor.propTypes = {
    graphicsMethod: PropTypes.object,
    colormaps: PropTypes.object,
    updateGraphicsMethod: PropTypes.func,
    show: PropTypes.bool,
    onHide: PropTypes.func
}

export default GraphicsMethodEditor;
