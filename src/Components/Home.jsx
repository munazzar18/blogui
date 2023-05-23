import Blogs from './Blogs'


function Home(props) {
    const {showAlert} = props
    return (
      <>
        <Blogs showAlert={showAlert}/>
      </>
    )
}

export default Home