import Blogs from "./Blogs"

const MyBlogs = (props) => {
    const {showAlert} = props
  return (
    <>
       <Blogs showAlert={showAlert}/>
    </>
  )
}

export default MyBlogs