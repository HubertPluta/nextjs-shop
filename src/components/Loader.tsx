export default function Loader({padding, width, height} : {
    padding: string,
    width: string,
    height: string,
  }) {
   return (
    <div className={`flex flex-row gap-2 justify-center p-${padding}`}>
        <div className={`w-${width} h-${height} rounded-full bg-stone-700 animate-bounce`}></div>
        <div className={`w-${width} h-${height} rounded-full bg-stone-700 animate-bounce [animation-delay:-.3s]`}></div>
        <div className={`w-${width} h-${height} rounded-full bg-stone-700 animate-bounce [animation-delay:-.5s]`}></div>
    </div>
   ); 
}