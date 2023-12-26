import { height, width } from "@mui/system"


export const Button = ({style})=>{
     console.log(style);
    const InbuiltStyle = " rounded-full border-none";

    const CompleteStyle = style+InbuiltStyle;
   
    console.log(CompleteStyle);
    

    return <button className={CompleteStyle}>
          SingUp    
    </button>
}