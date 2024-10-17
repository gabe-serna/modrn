export default function Dashboard() {
  return (
    <div className="mx-auto min-w-[1012px] max-w-[1012px]">
      <div className="mt-2 flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="mt-2 flex max-h-[calc(100vh-11.5rem)] min-h-[calc(100vh-11.5rem)] flex-1 items-center justify-center rounded-lg border shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Data here</h3>
          <p className="text-sm text-muted-foreground">
            General information about your store.
          </p>
        </div>
      </div>
    </div>
  );
}
