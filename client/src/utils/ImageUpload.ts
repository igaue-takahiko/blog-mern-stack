export const checkImage = (file: File) => {
  let error = ""
  if (!file) {
    return (error = "画像ファイルがありません。")
  }
  if (file.size > 1024 * 1024) {
    error = "画像サイズは最大1MBまでです"
  }

  return error
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "t.i-blog-image-db")
  formData.append("cloud_name", "dhst2rbxf")

  const res = await fetch(process.env.REACT_APP_CLOUD_IMAGE_DB_URL, {
    method: "POST",
    body: formData,
  })

  const date = await res.json()
  return { public_id: date.public_id, url: date.secure_url }
}
