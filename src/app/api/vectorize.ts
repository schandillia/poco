// import { PDFLoader } from "langchain/document_loaders/fs/pdf"

const vectorize = async (file: File) => {
  console.log("file: ", file)
  //   try {
  //     if (!file) {
  //       console.error("No file selected")
  //       return
  //     }

  //     const reader = new FileReader()
  //     reader.onload = async () => {
  //       const arrayBuffer = reader.result
  //       if (!arrayBuffer) {
  //         console.error("Failed to read file")
  //         return
  //       }
  //       const pdfData = Buffer.from(arrayBuffer)
  //       const pageLevelDocs = await PDFLoader.load(pdfData)
  //       const pagesAmt = pageLevelDocs.length

  //       // Vectorize and index the whole document
  //       console.log("pagesAmt: ", pagesAmt)
  //       console.log("arrayBuffer: ", arrayBuffer)
  //     }
  //     reader.onerror = (error) => {
  //       console.error("Error fetching arrayBuffer:", error)
  //     }
  //     reader.readAsArrayBuffer(file)
  //   } catch (error) {
  //     console.error("Error fetching arrayBuffer:", error)
  //   }
}

export default vectorize
