import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import SSLogo from "../../images/SSLogo.png"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <Link to="/" className="navbar__logo">
                <img src={SSLogo}></img>
            </Link>
            <li className="navbar__item" onClick={() => navigate("/diceroller")}>
                Dice
            </li>
            <li className="navbar__item">
                Trackers
            </li>
            <li className="navbar__item">
                Invitations
            </li>
            <li className="navbar__item">
                Messages
            </li>
            {
                (localStorage.getItem("ss_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("ss_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
