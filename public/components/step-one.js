import React from 'react';

class StepOne extends React.Component {

  constructor() {
    super();
    this.start = this.start.bind(this);
    let savedState = localStorage.getItem('app-state') || '{}';
    savedState = JSON.parse(savedState);

    this.state = savedState;
    this.state.stepState = 'initial';
    this.state.codeBoxTitle = 'Request';
    this.state.showSpinner = false;
    this.state.responseCode = '';
  }

  start() {
    this.setState({ showSpinner: true });

    setTimeout(() => {
      this.setState({
        codeBoxTitle: 'Request / Response',
        showSpinner: false,
        responseCode: 'https://openidconnect.net/callback?code=#4/SXjuF3gzD04Oouq'
      });
      this.props.nextStep();
    }, 500);

    let completeURL = this.props.authEndpoint + '?client_id=' + this.props.clientID + '&redirect_uri=' + this.props.redirectURI +'&scope=' + encodeURI(this.props.scopes) + '&response_type=code&state=' + this.props.stateToken
    window.location = completeURL;
  }

  render() {
    return (
      <div className={`playground-step ${this.props.isActive ? 'active' : ''}`}>
        <span className="step-number">1</span>
        <div className="step-content">
          <h2 className="step-title">Redirect to OpenID Connector Server</h2>
          <div className="code-box">
            <h3 className="code-box-title">{this.state.codeBoxTitle}</h3>
            <div className="code-box-content">
              <div className="code-block">
                <a onClick={this.props.openModal} href="#"> { this.props.authEndpoint || "Enter an authorization endpoint in the setting dialog!"} </a>
                <br />
                client_id=
                <span>{this.props.clientID}</span>
                <br />
                redirect_uri=https://openidconnect.net/callback 
                <br />
                ?scope=
                <span>{encodeURI(this.props.scopes)}</span>
                <br/>
                <span>&amp;response_type=code</span>
                <br />
                <span>&amp;state={this.props.stateToken}</span>
              </div>
              <hr />
              { this.state.responseCode ?
                <div className="code-block">{this.state.responseCode}</div> : null
              }

              { this.state.showSpinner ?
                <div className="theme-dark step-spinner-container">
                  <div className="spinner spinner-md step-spinner">
                    <div className="circle"></div>
                  </div>
                </div>
                :
                <button onClick={this.start} className="code-box-btn">Start</button>
              }
            </div>
          </div>
        </div>
        <button
          onClick={this.props.skipTutorial}
          className="skip-tutorial btn-link"
        >
          Skip this tutorial. Show me the complete flow.
        </button>
      </div>
    );
  }
}

StepOne.propTypes = {
  nextStep: React.PropTypes.func,
  skipTutorial: React.PropTypes.func,
  isActive: React.PropTypes.bool,
  openModal: React.PropTypes.func
};

export default StepOne;
