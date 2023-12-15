

export const SignUpDetails = (props)=>{
    const {changeIsSignUp} = props;
    return  <div className="signup">
    <h1 className="xh1" style={{ color: "white" }}>Don't have account with us</h1>
    <h4 className="h4" style={{ color: "white" }}>Sign up to create new account with us </h4>
    {/* <h3 style={{color:"white"}}>click here!</h3> */}
    <button className="signUp-button" onClick={changeIsSignUp}>Sign up</button>
</div>
}