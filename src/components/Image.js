
const Image = ({item}) => {
  return (
    <img key={item.id} src={item.image} alt="decoration" />
  )
}

export default Image