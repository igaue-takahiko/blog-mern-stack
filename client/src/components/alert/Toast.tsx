import React from "react"
import { useDispatch } from "react-redux"
import { ALERT } from "../../redux/alert/types"

interface IProps {
  title: string
  body: string | string[]
  bgColor: string
}

const Toast: React.FC<IProps> = ({ title, body, bgColor }) => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch({ type: ALERT, payload: {} })
  }

  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "8px", right: "8px", zIndex: 50, minWidth: "184px" }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={handleClose}
        />
      </div>
      <div className="toast-body">
        {typeof body === "string" ? (
          body
        ) : (
          <ul style={{ listStyle: "none" }}>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Toast
