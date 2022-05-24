import { ChangeEvent, useContext, useState } from 'react';
import { AppContext } from '../../state/AppContext';

export const IdentityMain = () => {
  const appState = useContext(AppContext);
  const [culture, setCulture] = useState(appState.culture);
  const cultureOptions = [
    { value: "et-EE", label: 'Eesti' },
    { value: "en-GB", label: 'English' }
  ]
  const changeCulture = (event: ChangeEvent<HTMLSelectElement>) => {
    setCulture(event.target.value);
    appState.culture = event.target.value;
    console.log(appState.culture);
  };

  return (
    <main role="main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4"> Account Info </h1>
            <hr />
            <table className="table table-secondary table-striped table-hover">
              <thead>
              </thead>
              <tbody>
                <tr>
                  <td className="width: 16.66%">Username</td>
                  <td> {appState.user?.personName}</td>
                </tr>
                <tr>
                  <td className="width: 16.66%">Email</td>
                  <td> {appState.user?.email}</td>
                </tr>
                <tr>
                  <td className="width: 16.66%">Culture</td>
                  <td>
                    <select value={culture} onChange={changeCulture}>
                      {cultureOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
    ;
}

export default IdentityMain;