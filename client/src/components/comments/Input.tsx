import React, { useState, useRef } from "react"
import { LiteQuill } from "../editor"

interface IProps {
  callback: (body: string) => void
}

const Input: React.FC<IProps> = ({ callback }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const [body, setBody] = useState("")

  const handleSubmit = () => {
    const div = divRef.current
    const text = div?.innerText as string
    if (!text.trim()) {
      return
    }

    callback(body)
    setBody("")
  }

  return (
    <div>
      <LiteQuill body={body} setBody={setBody} />
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{ __html: body }}
        style={{ display: "none" }}
      />
      <button
        className="btn btn-dark ms-auto d-block px-4 mt-2"
        onClick={handleSubmit}
      >
        送信する
      </button>
    </div>
  )
}

export default Input
