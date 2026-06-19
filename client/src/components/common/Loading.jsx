export default function Loading({ text = "Loading..." }) {
  return <div className="flex items-center justify-center p-8 text-gray-500">⏳ {text}</div>;
}
