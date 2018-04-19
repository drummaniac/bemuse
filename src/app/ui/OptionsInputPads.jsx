import './OptionsInputPads.scss'
import React from 'react'
import PropTypes from 'prop-types'

import OptionsInputKey from './OptionsInputKey'

class OptionsInputPads extends React.PureComponent {
  static propTypes = {
    texts: PropTypes.object,
    editing: PropTypes.string,
    onEdit: PropTypes.func
  }

  render () {
    let pads = []
    for (let i in this.props.texts) {
      pads.push(
        <OptionsInputKey
          n={i}
          key={i}
          text={this.props.texts[i]}
          isEditing={'' + i === '' + this.props.editing}
          onEdit={this.props.onEdit}
        />
      )
    }
    return (
      <div className='OptionsInputPads'>
        <div className='OptionsInputPadsのpads'>{pads}</div>
      </div>
    )
  }
}

export default OptionsInputPads
