import React from 'react';

class StepTwo extends React.Component {

  constructor() {
    super();
    this.exchange = this.exchange.bind(this);
    this.state = {
      codeBoxTitle: 'Request',
      showSpinner: false,
      responseCode: ''
    };
  }

  exchange() {
    this.setState({ showSpinner: true });

    setTimeout(() => {
      this.setState({
        codeBoxTitle: 'Request / Response',
        showSpinner: false,
        responseCode:
          `HTTP/1.1 200 OK
          Content-Type: application/json
          {
          	“access_token”: “SIAV32hkKG”,
          	“token_type”: “Bearer”,
          	“expires_in”: 3600,
          	“id_token”:”dfhjvhxvifdjgeiojfvifdvjcivjcxivjcivjcxvicb`
      });
      this.props.nextStep();
    }, 500);
  }

  render() {
    return (
      <div className={`playground-step ${this.props.isActive ? 'active' : ''}`} >
        <span className="step-number">2</span>
        <div className="step-content">
          <h2 className="step-title">Exchange Code from Token</h2>
          <p className="snippet-description">Your Code is </p>
          <div className="code-snippet">#4/SXjuF3gzD04OouqY_6-mfKyqV2VqoXF717ASRBTtL8w</div>
          <p>
            Now, we need to turn that access code into an access token,
            by having our server make a request to your token endpoint
          </p>
          <div className="code-box">
            <div className="code-box-title">{this.state.codeBoxTitle}</div>
            <div className="code-box-content">
              <div className="code-block">
                POST https://sample-oidc.auth0.com/oauth/token HTTP/1.1
                grant_type=authorization_code&
                client_id=7eruHypvzyvEjF5dNt2TN4tzKBE98PTc&
                client_secret=1fGXdsJnPfhodhwWCNQ_W7HpwrGGz
                redirect_url=https://openidconnect.net/callback&
                code=XXXXX
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
