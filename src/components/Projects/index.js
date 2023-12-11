import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ProjectItem from '../ProjectItem'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]
console.log(categoriesList)

const apiConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'initial',
}
class Projects extends Component {
  state = {
    activeCat: categoriesList[0].id,
    projectsList: [],
    apiStatus: apiConst.inprogress,
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({apiStatus: apiConst.inprogress})
    const {activeCat} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${activeCat}`,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.projects.map(eachobj => ({
        id: eachobj.id,
        name: eachobj.name,
        imageUrl: eachobj.image_url,
      }))
      console.log(updatedData)
      this.setState({projectsList: updatedData, apiStatus: apiConst.success})
    } else {
      this.setState({apiStatus: apiConst.failure})
    }
  }

  onClickedRetry = () => {
    this.getProjects()
  }

  successView = () => {
    const {projectsList} = this.state
    return (
      <ul className="succes-ul">
        {projectsList.map(eachobj => (
          <ProjectItem eachobj={eachobj} key={eachobj.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="loader">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={this.onClickedRetry}>
        Retry
      </button>
    </div>
  )

  inProgressView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  view = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConst.inprogress:
        return this.inProgressView()
      case apiConst.failure:
        return this.failureView()
      case apiConst.success:
        return this.successView()

      default:
        return null
    }
  }

  onChangCat = event => {
    this.setState({activeCat: event.target.value}, this.getProjects)
  }

  render() {
    return (
      <div className="project-main-bg">
        <nav className="nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="nav-img"
          />
        </nav>
        <div className="content-cont">
          <select className="cat-cont" onChange={this.onChangCat}>
            {categoriesList.map(eachobj => (
              <option value={eachobj.id} key={eachobj.id}>
                {eachobj.displayText}
              </option>
            ))}
          </select>
          {this.view()}
        </div>
      </div>
    )
  }
}

export default Projects
