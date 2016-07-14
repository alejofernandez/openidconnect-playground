import React from 'react';

class StepThree extends React.Component {

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
      <div className="playground-step">
        <span className="step-number">3</span>
        <div className="step-content">
          <h2 className="step-title">Validate the ID Token for User Profile</h2>
          <div>
            <div className="snippet-description pull-left">Your “id_token” is</div>
            <button className="btn-view-jwt">View on JWT.io</button>
          </div>
          <div className="code-snippet">
            “hjvcbhvbjvchbjcvhbjcvhbjvchbjcvhbjcvbhcjvxcvcvcvcvcvcvcvcvcc
          </div>
          <p>
            This token is cryptographically signed with HS256 Algorithm.
            We’ll use the client secret to validate it.
          </p>
          <p>Your “access_token” is</p>
          <div className="code-snippet">“SIAV32hkKG”</div>
          <div className="code-box">
            <div className="code-box-title">Request</div>
            <div className="code-box-content">
              <div className="code-block">
                GET https://sample-oidc.auth0.com/userinfo
                ? access_token= “SIAV32hkKG”
              </div>
              <hr />
              <button className="code-box-btn">Exchange</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepThree.propTypes = {
  nextStep: React.PropTypes.func,
  isActive: React.PropTypes.bool,
  openModal: React.PropTypes.func
};

export default StepThree;
