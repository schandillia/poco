import TitleCaseInput from "@/components/title-case/TitleCaseInput"

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-5 md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-300 dark:border-gray-500 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl">Convert to Title Case</h1>
      </div>
      <div className="shrink-0 flex-[0.75]">
        <TitleCaseInput />
      </div>
    </main>
  )
}
