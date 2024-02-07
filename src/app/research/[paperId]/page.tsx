export default function Page({ params }: { params: { paperId: string } }) {
  return (
    <div>
      <p>My Post: {params.paperId}</p>
    </div>
  )
}
