import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = item

  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="item-image" />
      <h1 className="item-title">{name}</h1>
      <div className="item-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="item-icon"
        />
        <p className="item-description">{`${starsCount} stars`}</p>
      </div>
      <div className="item-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="item-icon"
        />
        <p className="item-description">{`${forksCount} forks`}</p>
      </div>
      <div className="item-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="item-icon"
        />
        <p className="item-description">{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
