import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer class="py-3 my-4">
  <ul class="nav justify-content-center border-bottom pb-3 mb-3">
    <li class="nav-item mx-2">
      <a href="#" class="nav-link px-2 text-muted">
        <i class="bi bi-twitter"></i>
      </a>
    </li>
    <li class="nav-item mx-2">
      <a href="#" class="nav-link px-2 text-muted">
        <i class="bi bi-instagram"></i>
      </a>
    </li>
    <li class="nav-item mx-2">
      <a href="#" class="nav-link px-2 text-muted">
        <i class="bi bi-facebook"></i>
      </a>
    </li>
    <li class="nav-item mx-2">
      <a href="#" class="nav-link px-2 text-muted">
        <i class="bi bi-whatsapp"></i>
      </a>
    </li>
  </ul>
  <p class="text-center text-muted">© 2021 Company, Inc</p>
</footer>
);
  }
  
  export default Footer;
 