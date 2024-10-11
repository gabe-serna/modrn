export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[65vh] flex-col items-start gap-12">{children}</div>
  );
}
