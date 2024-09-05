export default function ({ children }) {
  return (
    <div className="flex flex-col items-start justify-start gap-spacing-400 p-spacing-400 w-full bg-components-fill-standard-primary border border-line-outline rounded-radius-600">
      {children}
    </div>
  );
}
