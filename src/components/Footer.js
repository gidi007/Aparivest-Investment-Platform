import React,{useState,useEffect} from 'react';
import '../stylesheets/Footer.css';
import { logo } from '../assets/assets';
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

//The footer section

const Footer = () => {

  const [packages, setPackages] = useState([]);
  const url = process.env.REACT_APP_URL;

useEffect(() => {
  const showPackages = async () => {
      try {
        const response = await axios.get(`${url}/package-list`);
  
        const packages = response.data
        setPackages(packages);
      } catch (error) {
        console.log(error);
      }
    }

    showPackages();
},[])

  return (
    <section className='footer-sec'>
      <div className='footer-con'>
        <div className='footer-left'>
          <Link to='/'>
            <div className='f-logo-flex'>
              <img src={logo} className='f-logo-img' />
              <span className='f-logo-text text-white'>Aparivest</span>
            </div>
          </Link>

          <h2 className= 'text-white'>Let's invest! 🤙</h2>
          <p>+2349160390237</p>
          <p>Aparivestdummy@gain.com</p>
          <p>Festac, Lagos. Nigeria</p>
        </div>

        <div className='footer-middle'>
          <div className='products'>
            <h5 className='text-whit'e>Products</h5>
            <ul>
            {packages.map((pkg) => (
              <li><Link to='/' className='text-white'>{pkg.name}</Link> </li>
              ))}
            </ul>
          </div>

          <div className='services'>
            <h5 className='text-white'>Services</h5>
            <ul>
              <li><Link to='/' className='text-white'>Buy Package</Link> </li>
              <li><Link to='/' className='text-white'>Profits</Link> </li>
              <li><Link to='/' className='text-white'>Withdrawal Fee</Link> </li>
              <li><Link to='/' className='text-white'>Affiliate Program</Link> </li>
              <li><Link to='/' className='text-white'>Referral Program</Link> </li>
              <li><Link to='/'  className='text-white'>Flutterwave</Link> </li>

            </ul>
          </div>


        </div>

        <div className='footer-right'>
          <h2 className='text-white'>Newsletters</h2>
          <p>Subscribe Our Newsletter
            To Get More Verified Investment News & Updates.</p>
          <form className='f-form'>
            <input type='text' placeholder='Enter Your Email' />
            <button type='submit'>Submit</button>
          </form>
          {/* The footer icon links that direct to my personal profile on social medias,meet me there */}
          <div className='f-links'>
            <a href="https://github.com/samojeyinka" target='_blank'><FaGithub className='text-white f_social_icon' /></a>
            <a href="https://linkedin.com/in/ojeyinka-samuel-02406125a" target='_blank' className='f_social_icon'><FaLinkedin className='text-white f_social_icon'/></a>
            <a href="https://wa.me/2348122624063" target='_blank' className='f_social_icon'><FaWhatsapp className='text-white f_social_icon' /></a>
            <a href="https://twitter.com/sam_ojeyinka" target='_blank' className='f_social_icon'><FaTwitter className='text-white f_social_icon'/></a>

          </div>


        </div>
      </div>
      <p className='copyRight text-white'>©2024 Aparivest.com All Rights Reserved. Terms Of Service | Privacy Terms</p>
      <p className='copyRight text-white'>Developed by : Gideon Bawa | Fullstack Developer</p>
    </section>
  )
}

export default Footer