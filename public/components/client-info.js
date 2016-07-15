import React from 'react';

class ClientInfo extends React.Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    let savedState = localStorage.getItem('app-state') || '{}';
    savedState = JSON.parse(savedState);
    this.state = savedState;
  }

  update() {
    window.dispatchEvent(new CustomEvent('configChange', {
      detail: {
        clientID: this.refs.clientID.value,
        clientSecret: this.refs.clientSecret.value,
        scopes: this.refs.scopes.value
      }
    }));
  }

  render() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="clientID" className="col-xs-2 control-label">OIDC Client ID:</label>
          <div className="col-xs-10">
            <input
              name="clientID"
              onChange={this.update}
              value={this.props.clientID}
              ref="clientID"
							className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="clientSecret"
            className="col-xs-2 control-label"
          >
            OIDC Client Secret:
          </label>
          <div className="col-xs-10">
            <input
              name="clientSecret"
              onChange={this.update}
              value={this.props.clientSecret}
              ref="clientSecret"
							className="form-control"
            />
          </div>
        </div>

				<div className="form-group">
					<label htmlFor="scopes" className="col-xs-2 control-label">Scope:</label>
					<div className="col-xs-10">
						<input className="form-control" name="scopes" onChange={this.update} value={this.props.scopes} ref="scopes" />
					</div>
				</div>
      </div>
    )
  }
}


export default ClientInfo