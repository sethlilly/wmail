const React = require('react')
const { SelectField, MenuItem, Toggle, Paper } = require('material-ui')
const flux = {
  mailbox: require('../../../stores/mailbox')
}

/* eslint-disable react/prop-types */

module.exports = React.createClass({
  displayName: 'GoogleMailAccountSettings',

  propTypes: {
    mailbox: React.PropTypes.object.isRequired
  },

  /* **************************************************************************/
  // User Interaction
  /* **************************************************************************/

  handleShowUnreadBadgeChange: function (evt, toggled) {
    flux.mailbox.A.update(this.props.mailbox.id, {
      showUnreadBadge: toggled
    })
  },

  handleShowNotificationsChange: function (evt, toggled) {
    flux.mailbox.A.update(this.props.mailbox.id, {
      showNotifications: toggled
    })
  },

  handleUnreadQueryChange: function (evt, index, searchQuery) {
    flux.mailbox.A.updateGoogleConfig(this.props.mailbox.id, { unreadQuery: searchQuery })
  },

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  /**
  * Renders the app
  */
  render: function () {
    return (
      <Paper zDepth={1} style={{ padding: 15 }}>
        <Toggle
          defaultToggled={this.props.mailbox.showUnreadBadge}
          label='Show unread badge'
          onToggle={this.handleShowUnreadBadgeChange} />
        <br />
        <Toggle
          defaultToggled={this.props.mailbox.showNotifications}
          label='Show notifications'
          onToggle={this.handleShowNotificationsChange} />
        <SelectField
          value={this.props.mailbox.google.unreadQuery}
          onChange={this.handleUnreadQueryChange}
          floatingLabelText='Unread Query'>
          <MenuItem
            key={flux.mailbox.Google.UNREAD_QUERY}
            value={flux.mailbox.Google.UNREAD_QUERY}
            primaryText='Unread Messages' />
          <MenuItem
            key={flux.mailbox.Google.PRIMARY_UNREAD_QUERY}
            value={flux.mailbox.Google.PRIMARY_UNREAD_QUERY}
            primaryText='Unread Primary Messages' />
        </SelectField>
      </Paper>
    )
  }
})
