const generateFileId = async (arrayBuffer: ArrayBuffer) => {
  // Convert the ArrayBuffer to a Uint8Array
  const uint8Array = new Uint8Array(arrayBuffer)
  // Calculate the SHA-256 hash of the Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", uint8Array)
  // Convert the hashBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")

  return `d_${hashHex}`
}
export default generateFileId
