import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeLogin } from './userSlice';

function Login() {
  const [userLogin, setUserLogin] = useState('admin@admin.com');
  const [userPassword, setUserPassword] = useState('admin_password');

  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(makeLogin({ userLogin, userPassword }));
  }

  return (
    <div>
      <h1> this is login page</h1>
      <form className="mx-2 my-2 flex flex-col" onSubmit={handleLogin}>
        <input
          placeholder="your login there"
          type="email"
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <input
          placeholder="your password there"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
