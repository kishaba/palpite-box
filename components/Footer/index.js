import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-700 p-4">
      <div className="container text-white mx-auto text-center font-bold">
        Projeto desenvolvido por:
        <a> Alexandre Mrus /</a>{' '}
        <a
          className="hover:underline"
          href="https://www.linkedin.com/in/alexandre-mrus-899a8363/"
        >
          Linkedin
        </a>{' '}
        <a className="hover:underline" href="https://github.com/kishaba">
          / Github
        </a>
        <div className="mt-2">
          <img
            className="w-32 inline p-4"
            src="/logo_semana_fsm.png"
            alt="devpleno"
          />
          <img
            className="w-32 inline p-4"
            src="/logo_devpleno.png"
            alt="devpleno"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
