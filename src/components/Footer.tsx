import './Footer.css'
import { FaReact, FaHeart } from 'react-icons/fa'
import { FiLinkedin, FiGithub } from 'react-icons/fi'

export const Footer = () => {
    return (
        <div className='footer-container'>
             <div className='btn-container'>
                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://github.com/cartxu">
                    <button className='btn'>Github <FiGithub /></button>
                </a>
                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/carmen-navarrosoria/">
                    <button className='btn'>Linkedin <FiLinkedin /></button>
                </a>
            </div>
            <p className='footer-diclaimer'>
                This site was built with <FaReact /> and <FaHeart /> by <strong>Carmen Navarro</strong>.
            </p>
           
        </div>
    )
}
