import { Button, Tooltip } from "@mui/material";
import { CustomModal } from "../../components/CustomModal/CustomModal"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';


export const PaymentCompletion = ({downloadPdf,open,sendEmail,handlePaymentModal,handleClosePaymentModal})=>{
    const handleDownloadPdf = ()=>{
       window.open("/bill", "_blank");
    }
return <CustomModal height={265} open={open}>
    <div className="h-full p-2">

    <div className="h-6 w-full flex justify-end " ><Tooltip title="Close Modal" onClick={handleClosePaymentModal} arrow><CloseIcon onClick={handleClosePaymentModal} sx={{cursor:"pointer",color:"white",backgroundColor:"red",borderRadius:"10%"}} color='danger'/></Tooltip></div>
    <div className="flex flex-col items-center gap-6 h-5/6">    
        <div className="w-full h-20 flex justify-center items-center ">
        <CheckCircleIcon color="success" sx={{height:"90px", width:"90px"}} className="h-full w-full"/>
        </div>
        <h1 className="text-2xl mb-2 font-semibold ">Payment Completed Successfully</h1>
        <div className="flex gap-5">
            <Button onClick={handleDownloadPdf} variant="contained">Download details as PDF</Button> <Button variant="contained" onClick={sendEmail}>Send details to email</Button>
        </div>
    </div>
    </div>
</CustomModal>
}