import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import "./Footer.css";
export const Footer = () => {
    return <div className="footer-container mt-auto bg-blue-100">
        <hr className='w-full border border-gray'/>
        <div className="icons-container flex gap-3 justify-center text-black">
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
        
        <div className=' text-black'>Contact us on +32097824</div><CopyrightIcon/><label>2023 </label></div>
        
    </div>
}