import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeLogin } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helpers';

function Login() {
  const [userLogin, setUserLogin] = useState('admin@admin.com');
  const [userPassword, setUserPassword] = useState('admin_password');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(
      makeLogin({
        reqData: { userLogin, userPassword },
        navigateTo: () => navigate('/certs'),
      }),
    );
  }

  function handleEmailChange(e) {
    setUserLogin(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  }

  function hanlePasswordChange(e) {
    setIsPasswordValid(validatePassword(e.target.value));
    setUserPassword(e.target.value);
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-96 flex-col rounded-md bg-white ">
        <div className="bg-stone-500 p-4">
          <h3 className="font-semibold text-stone-50">Login</h3>
        </div>
        <div className="w-full p-8 ">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="w-full rounded-md border border-blue-300 bg-blue-50 px-3 py-2 text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={userLogin}
                  onChange={handleEmailChange}
                />

                <p className="pl-2 text-sm text-red-500">
                  {!isEmailValid ? (
                    <span>
                      please enter a valid email shortern than 30 chars
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </p>
              </div>
              <div>
                <div className="mb-2 flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="w-full rounded-md border border-blue-300 bg-blue-50 px-3 py-2 text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={userPassword}
                  onChange={hanlePasswordChange}
                />
                <p className="pl-2 text-sm text-red-500">
                  {!isPasswordValid ? (
                    <span>
                      password shoud be longer than 3 and shorter 30 chars
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex gap-x-2">
                <button
                  type="button"
                  className="w-full rounded-md bg-blue-600 px-8 py-3 text-blue-100 transition-all duration-300 hover:bg-blue-500 active:bg-blue-400 disabled:bg-blue-200"
                  onClick={handleLogin}
                  disabled={!isEmailValid || !isPasswordValid}
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
