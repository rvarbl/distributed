import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../state/AppContext';


const Header = () => {
    const appState = useContext(AppContext);
    if (appState.user === undefined) {
        try {
            let userString = localStorage.getItem("user");
            if (userString !== null) {
                let user = JSON.parse(userString);
                appState.setUser(user);
            }
        } catch {
            console.log("did not find user");
        }
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-success border-bottom box-shadow mb-3 sticky-top">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand" active-class="active">RecipeApp</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" active-class="active">Home</Link>
                                </li>
                                {appState.user !== undefined &&
                                    <>
                                        <li className="nav-item">
                                            <Link to="/recipes" className="nav-link" active-class="active">Recipes</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/orders" className="nav-link" active-class="active">Orders</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/orders_current" className="nav-link" active-class="active">Current Order</Link>
                                        </li>
                                    </>
                                }


                            </ul>
                            <ul className="navbar-nav">
                                {appState.user !== undefined &&
                                    <>
                                        <li>
                                            <div className="nav-link">Hello {appState.user?.personName ?? "noName"}</div>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/identity" className="nav-link" active-class="active">My Profile</Link>
                                        </li><li className="nav-item">
                                            <Link to="/logout" className="nav-link" active-class="active">Logout</Link>
                                        </li>
                                    </>
                                }
                                {appState.user === undefined &&
                                    <>
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link" active-class="active">Register</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link" active-class="active">Login</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};


export default Header;