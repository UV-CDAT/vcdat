import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddEditRemoveNav from './AddEditRemoveNav/AddEditRemoveNav.jsx'
import TemplateEditor from './modals/TemplateEditor.jsx'
import TemplateCreator from './modals/TemplateCreator.jsx'
import DragAndDropTypes from '../constants/DragAndDropTypes.js'
import { DragSource } from 'react-dnd'
import { toast } from 'react-toastify'


// Use a simple function-based component, rather than a fancy class one.
function TemplateItem(props) {
    // This function is injected by the Dra
    return props.connectDragSource(
        <li className={props.active ? "active" : ""} onClick={(e) => {props.selectTemplate(props.template)}}>
            <a>{props.template}</a>
        </li>
    );
}

// Formats the data object passed to drop targets using the draggable component's props
const templateSource = {
    beginDrag(props) {
        return {
            template: props.template
        };
    }
};

// Assemble the functions and properties to inject into the TemplateItem
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

// Create a draggable version of the TemplateItem
const DraggableTemplateItem = DragSource(DragAndDropTypes.TMPL, templateSource, collect)(TemplateItem);


class TemplateList extends Component {
    constructor(props){
        super(props)
        this.state = {
            showTemplateEditor: false,
            showTemplateCreator: false,
        }
        this.editTemplate = this.editTemplate.bind(this)
    }
    
    editTemplate() {
        if(this.props.selected_template === ""){
            toast.info("A template must be selected to edit", { position: toast.POSITION.BOTTOM_CENTER })
        }
        else{
            this.setState({showTemplateEditor: true, template_data: "loading"})
            vcs.gettemplate(this.props.selected_template).then((data)=>{
                this.setState({template_data: data})
            },
            (error) => {
                console.warn(error)
                toast.error("Failed to get template data. If this happens with other templates, try restarting vCDAT.",
                    { position: toast.POSITION.BOTTOM_CENTER }
                )
                this.setState({template_data: "error"})
            })
        }
    }

    render() {
        return (
            <div className='left-side-list scroll-area-list-parent template-list-container'>
                <AddEditRemoveNav
                    addText="Adding templates is not supported yet"
                    addAction={() => { this.setState({showTemplateCreator: true}) }}
                    editAction={this.editTemplate}
                    editText="Edit a selected template"
                    removeText="Removing a template is not supported yet"
                    title='Templates'
                />
                <div className='scroll-area'>
                    <ul id='temp-list' className='no-bullets left-list'>
                        {this.props.templates.map((value, index) => {
                                return (
                                    <DraggableTemplateItem
                                        template={value}
                                        key={index}
                                        active={value === this.props.selected_template}
                                        selectTemplate={(t) => {
                                            this.props.selectTemplate(t)
                                        }}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
                <TemplateEditor
                    show={this.state.showTemplateEditor}
                    close={() => this.setState({showTemplateEditor: false})}
                    template={this.state.template_data}
                />
                {
                    this.state.showTemplateCreator &&
                    <TemplateCreator
                        show={this.state.showTemplateCreator}
                        close={() => this.setState({showTemplateCreator: false})}
                        templates={this.props.templates}
                    />
                }
                
            </div>
        );
    }
}
TemplateList.propTypes = {
    templates: PropTypes.arrayOf(PropTypes.string),
    selected_template: PropTypes.string,
    selectTemplate: PropTypes.func,
    updateTemplate: PropTypes.func,
}

export default TemplateList;
