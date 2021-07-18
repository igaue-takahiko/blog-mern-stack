import React from "react"

const Footer: React.FC = () => {
  return (
    <div className="py-4 text-center bg-light">
      <h6>Welcome to my Twitter</h6>
      <a
        href="http://twitter.com/takahiko_igaue"
        target="_blank"
        rel="noreferrer"
        className="mb-2 d-block text-secondary"
      >
        http://twitter.com/takahiko_igaue
      </a>
      <p> Copyright &copy; 2021</p>
    </div>
  )
}

export default Footer
