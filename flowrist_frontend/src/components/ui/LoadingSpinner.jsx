export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <h1 className="font-serif text-4xl tracking-wide">Dolce Fiore</h1>

      <div className="mt-6 h-[2px] w-40 overflow-hidden bg-gray-200">
        <div className="h-full animate-pulse bg-black"></div>
      </div>
    </div>
  );
}
