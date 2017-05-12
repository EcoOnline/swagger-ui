import React, { PropTypes } from "react"

//import "./topbar.less"
import Logo from "./logo_small.png"

export default class Topbar extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      specs: []
    }
    this.setSpecs = this.setSpecs.bind(this)
  }

  setSpecs(json) {
    this.setState({ specs: json }, this.onUrlChange({target: {value: json[0].url}}))
  }

  componentDidMount() {
    fetch(specsurl)
      .then(function(response) { return response.json() })
      .then(this.setSpecs)
  }

  onUrlChange =(e)=> {
    let {target: {value}} = e
      let url = value
      this.props.specActions.updateUrl(url)
      this.props.specActions.download(url)
  }

  render() {
    let { getComponent, specSelectors } = this.props
    const Button = getComponent("Button")
    const Link = getComponent("Link")

    let isLoading = specSelectors.loadingStatus() === "loading"
    let isFailed = specSelectors.loadingStatus() === "failed"

    let inputStyle = {}
    if(isFailed) inputStyle.color = "red"
    if(isLoading) inputStyle.color = "#aaa"
    return (
        <div className="topbar">
          <div className="wrapper">
            <div className="topbar-wrapper">
              <Link href="#" title="Swagger UX">
                <img height="30" width="30" src={ Logo } alt="Swagger UX"/>
                <span>swagger</span>
              </Link>
              <form className="download-url-wrapper" onSubmit={this.downloadUrl}>
                <select onChange={ this.onUrlChange }>
                  {this.state.specs.map(function(spec){
                    return <option value={spec.url}>{spec.title}</option>;
                  })}
                </select>
              </form>
            </div>
          </div>
        </div>

    )
  }
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired
}
