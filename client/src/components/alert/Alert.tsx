import React from "react"
import { useSelector } from "react-redux"

import { RootStore } from "../../utils/globalTypes"
import Loading from "./Loading"
import Toast from "./Toast"

export const Alert: React.FC = () => {
  const { alert } = useSelector((state: RootStore) => state)
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.errors && (
        <Toast title="Errors" body={alert.errors} bgColor="bg-danger" />
      )}
      {alert.success && (
        <Toast title="Success" body={alert.success} bgColor="bg-success" />
      )}
    </div>
  )
}

export const showErrorMessage = (msg: string) => {
  return <div className="errorMsg">{msg}</div>
}
export const showSuccessMessage = (msg: string) => {
  return <div className="successMsg">{msg}</div>
}
