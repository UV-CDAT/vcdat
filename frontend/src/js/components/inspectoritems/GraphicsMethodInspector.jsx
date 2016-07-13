import React from 'react'

var GraphicsMethodInspector = React.createClass({
    render(){
        return(

            <div className='inspector-selector btn-group'>
                    <h5 className='black'>Graphics Method:</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>

                                    <div className='dropdown-container'>
                                        <button type="button" className="btn btn-info dropdown-toggle dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                            <span className='inspector-dropdown-title'>{this.props.graphicsMethodParent}</span>
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            {(this.props.populateInspector ? Object.keys(this.props.graphicsMethods).map((value, index) => {
                                                return (
                                                    <li onClick={this.props.changePlotGM.bind(this, true, value)} key={'inspector_gmp_' + value} className={'inspector-dropdown-item ' + (value === this.props.graphicsMethodParent ? 'active'
                                                        : '')}>{value}</li>
                                                )
                                            }): [])}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='dropdown-container'>

                                        <button type="button" className="btn btn-info dropdown-toggle dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className='inspector-dropdown-title'>{this.props.graphicsMethod}</span>
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            {(this.props.populateInspector ? this.props.graphicsMethods[this.props.graphicsMethodParent].map((value, index) => {
                                                return (
                                                    <li onClick={this.props.changePlotGM.bind(this, false, value)} key={'inspector_gm_' + value} className={'inspector-dropdown-item ' + (value === this.props.graphicsMethod ? 'active'
                                                        : '')}>{value}</li>
                                                )
                                            }): [] )}
                                        </ul>

                                    </div>
                                </td>
                                <td className='edit-button'>
                                    <button type='button' className='btn btn-default'>Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

        )
    }
})

export default GraphicsMethodInspector;