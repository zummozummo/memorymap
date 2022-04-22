import Footer from '../../common/Smart/Footer'
import Header from '../../common/Smart/Header'




const Layout = (props) => {
    console.log(props)
    return(
        <main>
            <Header/>
            {/* {props.children} */}
            <Footer/>
        </main>
    )
}

export default Layout