import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () =>
    <>
        <div className='container'>
            <div className='text-center'>
                <h1 className="display-6">Oops!</h1>
                <h2 className="display-5">Sorry, an error has occured</h2>

                <Link to="/" className="btn btn-outline-primary fs-1">Take me home</Link>
            </div>
        </div>

    </>

export default ErrorPage;