import React from 'react';
import Ajax from 'simple-ajax';

class StepTwo extends React.Component {

  constructor() {
    super();
    this.start = this.start.bind(this);
    this.state = {};
    this.state.codeBoxTitle = 'Request';
    this.state.showSpinner = false;
    this.state.responseCode = '';
  }

  start() {
    this.setState({ showSpinner: true });
    let serviceDiscovery = new Ajax({
      url: '/code_to_token',
      method: 'POST',
      data: JSON.stringify({
        code: this.props.authCode,
        clientID: this.props.clientID,
        clientSecret: this.props.clientSecret,
        server: this.props.server,
        tokenEndpoint: this.props.tokenEndpoint
      })
    })

    serviceDiscovery.on('success', function(event){
      this.setState({ stepState: 'initial'})
      let result = JSON.parse(event.currentTarget.response)
      result = JSON.parse(result.body)
      console.log(result)
      window.dispatchEvent(new CustomEvent('configChange', {
        detail: {
          accessToken: result.access_token,
          idToken: result.id_token,
          currentStep: 3
        }
      }))
    }.bind(this))

    // TODO: Add error case

    serviceDiscovery.send()
  }

  render() {
    return (
      <div className={`playground-step ${this.props.isActive ? 'active' : ''}`} >
        <span className="step-number">2</span>
        <div className="step-content">
          <h2 className="step-title">Exchange Code from Token</h2>
          <p className="snippet-description">Your Code is </p>
        <div className="code-snippet">{this.props.authCode}</div>
          <p>
            Now, we need to turn that access code into an access token,
            by having our server make a request to your token endpoint
          </p>
          <div className="code-box">
            <div className="code-box-title">{this.state.codeBoxTitle}</div>
            <div className="code-box-content">
              <div className="code-block">
                POST {this.props.tokenEndpoint} HTTP/1.1
                grant_type=authorization_code&amp;
                client_id={this.props.clientID}&amp;
                client_secret={this.props.clientSecret}
                redirect_url=https://openidconnect.net/callback&amp;
                code={this.props.authCode}
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
                <button onClick={this.exchange} className="code-box-btn">Exchange</button>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepTwo.propTypes = {
  nextStep: React.PropTypes.func,
  isActive: React.PropTypes.bool,
  openModal: React.PropTypes.func
};

export default StepTwo;
