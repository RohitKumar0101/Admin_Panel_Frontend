import { Button } from "@mui/material";


export const LoginDetails = (prop) => {
    const {changeIsSignUp} = prop;
    return <div className="login-details"> <h1 className="xh1" style={{ color: "white" }}>Already have an account!</h1>
        <h2 className="h4" style={{ color: "white" }}>Click on Sign In</h2>
        {/* <button className="signIn-details-button" onClick={changeIsSignUp}>Sign In</button> */}

        <Button onClick={changeIsSignUp}  sx={{
          "&:hover": {
            color:"whitesmoke",
            backgroundColor: "#72A0C1 !important",
          },
          textTransform: 'none'
        }} style={{borderRadius:"2rem",height:"2.5rem",width:"5.5rem",backgroundColor:"white",marginTop:".7rem"}}>Sign In</Button>
    </div>
}