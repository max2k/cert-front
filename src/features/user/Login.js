function Login() {
    return (
        <div>
           <h1> this is login page</h1> 
           <form className="flex flex-col">
              <input defaultValue="Email"/>
              <input defaultValue="password"/>
              <button>Login</button>
           </form>
        </div>
    )
}

export default Login
