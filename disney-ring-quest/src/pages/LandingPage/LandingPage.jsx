import {Link} from 'react-router-dom'
import './LandingPage.css'
import logo from '../../../public/images/logo.png'


function LandingPage() {
    return (
        <div className='landing-container'>
            <div className='contents'>
                <img src={logo} className='logo-img'/>
                <h1>
                    Héroes vs. Villanos
                </h1>
                <p> 
                    ¿Será posible recuperar el <span>anillo</span>?
                </p> 
                <Link to="/main">
                    <button className='main-page-button'>
                        Ir a main
                    </button> 

                </Link>
                <Link to= "/usercheck">
                    <button className='main-page-button'>
                        ¿Are u User?
                    </button>
                </Link>
                <Link to= "/admincheck">
                    <button className='main-page-button'>
                        ¿Are u Admin?
                    </button>
                </Link>
            </div> 

        </div>
  
    )
}

export default LandingPage;