import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, isActive, updateActiveId} = props
  const {id, language} = languageItem
  const btnClass = isActive ? 'filter-btn active' : 'filter-btn'

  const onClickLanguage = () => {
    updateActiveId(id)
  }

  return (
    <li className="language-item">
      <button type="button" className={btnClass} onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
