import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
  email: string;
  password: string;
}

interface SignInPageProps {
  Show: () => void; // Define the type of the Show prop
}

const SignInPage: React.FC<SignInPageProps> = ({ Show }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card col-lg-6 bg-transparent border-0">
        <div className="card-body bg-white bg-opacity-75 rounded p-4 shadow">
          <h3 className="card-title text-center mb-4">Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </form>
          <div>
            <p>
              No account?{" "}
              <span
                style={{ color: "green", cursor: "pointer" }}
                onClick={Show}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
