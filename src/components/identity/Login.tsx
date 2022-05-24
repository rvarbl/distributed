import React, { FormEvent, useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import App from '../../App';
import { IAppUser } from '../../domain/identity/IAppUser';
import { AuthenticationService } from '../../services/identity/AuthenticationService';
import { IErrorResponse } from '../../services/response/IErrorResponse';
import { IJWTResponse } from '../../services/response/IJwtResponse';
import { AppContext, initialState } from '../../state/AppContext';
import Home from '../Home';


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[] | undefined>(undefined);
  const authService = new AuthenticationService();
  
  let appState = useContext(AppContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit:");
    let response = await authService.login(email, password);

    if (response.status == 200) {
      let user: IAppUser = response.data as IAppUser;
      appState.setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
      //window.location.reload();
      return (<Navigate to="/" />)
    }
    else {
      let errorResponse = response.errorResponse as IErrorResponse
      let messages: string[] = Object.values(errorResponse.errors);
      setErrorMessages(messages);
    }
  };

  return (
    <>
      <main role="main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">

              <h1 className="display-4"> Login </h1>
              <div className="form-control">

                {errorMessages !== undefined &&
                  <ul>
                    {
                      errorMessages.map(error => {
                        return (
                          <li className="text-danger validation-summary-errors">
                            {error}
                          </li>
                        )
                      })
                    }
                  </ul>
                }

                <form onSubmit={e => { handleSubmit(e) }}>
                  <div className="form-floating">
                    <input className="form-control" type="text" value={email} onChange={(x) => { setEmail(x.target.value) }} />
                    <label className="form-label">Email</label>
                  </div>
                  <div className="form-floating">
                    <input className="form-control" type="password" value={password} onChange={(x) => { setPassword(x.target.value) }} />
                    <label className="form-label" >Password</label>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Login" className="w-100 btn btn-lg btn-primary" />
                  </div>
                </form>
                <div>
                  <p>
                    <Link to="/register" className="nav-link" active-class="active">Register as a new user</Link>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </>);
  ;
}

export default Login;