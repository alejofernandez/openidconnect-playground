import React from 'react';
import StepOne from './step-one';
import StepTwo from './step-two';
import StepThree from './step-three';
import StepFour from './step-four';
import ConfigurationModal from './configuration-modal';

class OpenIDPage extends React.Component {

  constructor() {
    super();
    this.setConfigurationModalVisibility = this.setConfigurationModalVisibility.bind(this);
    this.setStep = this.setStep.bind(this);
    this.skipTutorial = this.skipTutorial.bind(this);

    this.state = {
      currentStep: 1,
      configurationModalOpen: false,
      tutorialSkiped: false
    };
  }

  setConfigurationModalVisibility(v) {
    this.setState({ configurationModalOpen: v });
  }

  setStep(step) {
    this.setState({ currentStep: step });
  }

  skipTutorial() {
    this.setState({
      currentStep: 4,
      tutorialSkiped: true
    });
  }

  render() {
    return (
      <div className="openid-page">

        <header className="main-header">
          <nav className="main-navigation">
            <div className="container">
              <a href="" className="openid-logo">
                <h1 className="logo-text">OpenID</h1>
              </a>
              <ul className="navigation">
                <li className="navigation-item">
                  <a href="">Debugger</a>
                </li>
                <li className="navigation-item">
                  <a href="">Libraries</a>
                </li>
                <li className="navigation-item">
                  <a href="">Introduction</a>
                </li>
                <li className="navigation-item">
                  <a href="">Ask</a>
                </li>
                <li className="navigation-item">
                  <a href="">Get a T-shirt!</a>
                </li>
              </ul>
              <div className="social-icons">
                <a href="" className="auth0-icon"></a>
                <a href="" className="twitter-icon"></a>
              </div>
            </div>
          </nav>
          <section className="hero">
            <div className="container">
              <h1 className="hero-title">OpenID Connect Playground</h1>
              <h2 className="hero-subtitle">
                The OIDC playground is so developers can test and work with OpenID
                Connect calls step-by-step, giving them more insight into how OpenID Connect works.
              </h2>
            </div>
          </section>
        </header>

        <main className="playground">
          <div className="container">
            <div className="playground-header">
              <h2 className="playground-header-title">Debugger</h2>
              <button
                onClick={ () => { this.setConfigurationModalVisibility(true); } }
                className="playground-header-config btn btn-link"
                href=""
              >
                <i className="icon-budicon-329"></i>
                Configuration
              </button>
            </div>
            <div
              className={`playground-content ${this.state.tutorialSkiped ? 'skip-tutorial' : ''}`}
            >
              { this.state.currentStep >= 1 ?
                <StepOne
                  openModal={ () => { this.setConfigurationModalVisibility(true); } }
                  nextStep={ () => { this.setStep(2); } }
                  skipTutorial={this.skipTutorial}
                  isActive={ this.state.currentStep === 1 }
                />
                : null
              }
              { this.state.currentStep >= 2 ?
                <StepTwo
                  nextStep={ () => { this.setStep(3); } }
                  isActive={ this.state.currentStep === 2 }
                />
                : null
              }
              { this.state.currentStep >= 3 ?
                <StepThree
                  isActive={ this.state.currentStep === 3 }
                />
                : null
              }
              { this.state.currentStep >= 4 ?
                <StepFour
                  isActive={ this.state.currentStep === 4 }
                />
                : null
              }
            </div>
          </div>
        </main>
        {this.state.configurationModalOpen ?
          <ConfigurationModal
            closeModal={ () => { this.setConfigurationModalVisibility(false); } }
          />
          : null }
        <footer className="main-footer">
          <div className="container">
            <span>Crafted by</span>
            <span className="auth0-badge"></span>
            <span>© 2013-2016 Auth0 Inc. All Rights Reserved.</span>
          </div>
        </footer>

      </div>
    );
  }
}

export default OpenIDPage;
