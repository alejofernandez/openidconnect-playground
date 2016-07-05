import React from 'react';

class StepOne extends React.Component {

  constructor() {
    super();
    this.start = this.start.bind(this);
    this.state = {
      codeBoxTitle: 'Request',
      showSpinner: false,
      responseCode: ''
    };
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
                <a onClick={this.props.openModal} href="#"> { "https://sample-oidc.auth0.com/authorize?" } </a>
                <br />
                client_id=
                <a
                  onClick={this.props.openModal}
                  href="#"
                >
                {"7eruHypvzyvEjF5dNt2TN4tzKBE98PTc"}
                </a>
                <br />
                redirect_uri=https://openidconnect.net/callback 
                <br />
                scope=
                <a onClick={this.props.openModal} href="#"> openid name email response_type=code </a>
                <br />
                state=poifhjoeif2
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
