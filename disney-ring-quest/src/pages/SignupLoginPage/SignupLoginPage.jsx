import { Link } from 'react-router-dom'
import './SignupLoginPage.css'

function SignupLoginPage() {
	return (
		<div className="container-signuplogin">
			<div className="column">
				<h2>Registrarse</h2>
				<p>Ingresa tus datos poder salvar el mundo Disney!</p>
				<Link to="/signup">
					<button className="button-register">Registrarse</button>
				</Link>
			</div>
			<div className="column">
				<h2>Iniciar sesión</h2>
				<p>¿Deseas jugar un apasionante juego? Entra!</p>
				<Link to="/login">
					<button className="button-login">Iniciar sesión</button>
				</Link>
			</div>
		</div>
	)
}

export default SignupLoginPage;