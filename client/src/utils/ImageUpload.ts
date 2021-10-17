export const checkImage = (file: File) => {
  const types = ["image/png", "image/jpeg"]
  let error = ""
  if (!file) {
    return (error = "画像ファイルがありません。")
  }
  if (file.size > 1024 * 1024) {
    error = "画像サイズは最大1MBまでです"
  }
  if (!types.includes(file.type)) {
    error = "使用できる画像タイプはpng / jpegだけです。"
  }

  return error
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "t.i-blog-image-db")
  formData.append("cloud_name", "dhst2rbxf")

  const CLOUD_IMAGE_DB_URL = "https://api.cloudinary.com/v1_1/dhst2rbxf/upload"

  const res = await fetch(CLOUD_IMAGE_DB_URL, {
    method: "POST",
    body: formData,
  })

  const date = await res.json()
  return { public_id: date.public_id, url: date.secure_url }
}
