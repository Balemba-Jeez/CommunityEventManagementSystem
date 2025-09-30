export function EmptyCategories() {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center">
      <div className="mb-8 h-64 w-full max-w-md">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/No%20categories%20not%20found%20page..-IiQSc5p7wnCEAFZt2M8ZEBo9Tiy4c1.jpg"
          alt="No categories found illustration"
          className="h-full w-full object-contain"
        />
      </div>
      <h2 className="mb-3 text-2xl font-semibold text-foreground">No File Found!</h2>
      <p className="max-w-md text-center text-muted-foreground">
        Looks like you haven&apos;t added any files yet. Get started by uploading your first file or creating a folder
        to keep things organized. It&apos;s simple and quick!
      </p>
    </div>
  )
}
