import './index.css'

const ProjectItem = props => {
  const {eachobj} = props
  const {name, imageUrl} = eachobj
  return (
    <li className="succes-item">
      <img src={imageUrl} alt={name} className="item-img" />
      <p>{name}</p>
    </li>
  )
}

export default ProjectItem
