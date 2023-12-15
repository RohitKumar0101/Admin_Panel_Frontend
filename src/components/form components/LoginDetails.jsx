

export const LoginDetails = (prop) => {
    const {changeIsSignUp} = prop;
    return <div className="login-details"> <h1 className="xh1" style={{ color: "white" }}>Already have an account!</h1>
        <h2 className="h4" style={{ color: "white" }}>Click on Sign In</h2>
        <button className="signIn-details-button" onClick={changeIsSignUp}>Sign In</button>
    </div>
}