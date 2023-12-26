import { Button } from "@mui/material";


export const SignUpDetails = (props)=>{
    const {changeIsSignUp} = props;
    return  <div className="signup">
    <h1 className="xh1" style={{ color: "white" }}>Don't have account with us</h1>
    <h4 className="h4" style={{ color: "white" }}>Sign up to create account </h4>
    {/* <h3 style={{color:"white"}}>click here!</h3> */}
    {/* <button className="signUp-button" onClick={changeIsSignUp}>Sign up</button> */}
    <Button onClick={changeIsSignUp} sx={{
          "&:hover": {
            color:"whitesmoke",
            backgroundColor: "#72A0C1 !important",
            boxShadow: "none !important",
          },
          textTransform:"none"
        }} style={{borderRadius:"2rem",height:"2.5rem",width:"5.5rem",backgroundColor:"white",marginTop:".7rem"}}>Sign up</Button>
</div>
}