import { FormEvent, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IAppUser } from '../../domain/identity/IAppUser';
import { IRegister } from '../../domain/identity/IRegister';
import { AuthenticationService } from '../../services/identity/AuthenticationService';
import { IErrorResponse } from '../../services/response/IErrorResponse';
import { AppContext } from '../../state/AppContext';

export const Register = () => {
  let appState = useContext(AppContext);
  const [errorMessages, setErrorMessages] = useState<string[] | undefined>(undefined);
  const authService = new AuthenticationService();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit:", email, password);
    if (password !== password2) {
      setErrorMessages(["Passwords do not match!"])
    }
    else {
      let registerDto: IRegister = { email: email, password: password, personName: name }
      let response = await authService.register(registerDto);
      if (response.status == 200) {
        let user: IAppUser = response.data as IAppUser;
        appState.setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
      else {
        let errorResponse = response.errorResponse as IErrorResponse
        let messages: string[] = Object.values(errorResponse.errors);
        setErrorMessages(messages);
      }
    }

  };

  return (
    <main role="main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">

            <h1 className="display-4">Register</h1>

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
                  <input className="form-control" type="text" value={email} onChange={(x) => (setEmail(x.target.value))} />
                  <label className="form-label" >Email</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="text" value={name} onChange={(x) => (setName(x.target.value))} />
                  <label className="form-label" >Name</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="password" value={password} onChange={(x) => (setPassword(x.target.value))} />
                  <label className="form-label" >Password</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="password" value={password2} onChange={(x) => (setPassword2(x.target.value))} />
                  <label className="form-label" >Confirm Password</label>
                </div>
                <div className="form-group">
                  <input type="submit" value="Register" className="w-100 btn btn-lg btn-primary" />
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Register;