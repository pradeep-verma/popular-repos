import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiResponseStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    repositoryList: '',
    responseStatus: apiResponseStatus.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({responseStatus: apiResponseStatus.inProgress})
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        repositoryList: updatedData,
        responseStatus: apiResponseStatus.success,
      })
    } else {
      this.setState({responseStatus: apiResponseStatus.failure})
    }
  }

  updateActiveId = activeId => {
    this.setState({activeId}, this.getData)
  }

  renderLanguageFilter = () => {
    const {activeId} = this.state
    return (
      <ul className="language-list-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageItem={eachLanguage}
            isActive={activeId === eachLanguage.id}
            updateActiveId={this.updateActiveId}
          />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repository-list-container">
        {repositoryList.map(eachItem => (
          <RepositoryItem key={eachItem.id} item={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderData = () => {
    const {responseStatus} = this.state
    switch (responseStatus) {
      case apiResponseStatus.success:
        return this.renderSuccessView()
      case apiResponseStatus.failure:
        return this.renderFailureView()
      case apiResponseStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 className="popular-title">Popular</h1>
          {this.renderLanguageFilter()}
          {this.renderData()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
