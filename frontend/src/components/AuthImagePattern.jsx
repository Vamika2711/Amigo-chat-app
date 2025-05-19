// const AuthImagePattern = ({ title, subtitle }) => {
//   return (
//     <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//       <div className="max-w-md text-center">
//         <div className="grid grid-cols-3 gap-3 mb-8">
//           {[...Array(9)].map((_, i) => (
//             <div
//               key={i}
//               className={`aspect-square rounded-xl bg-gray-200 ${
//                 i % 2 === 0 ? "animate-pulse" : ""
//               }`}
//             />
//           ))}
//         </div>
//         <h2 className="text-2xl font-bold mb-4">{title}</h2>
//         <p className="text-base-content/60">{subtitle}</p>
//       </div>
//     </div>
//   );
// };

// export default AuthImagePattern;

const AuthImagePattern = ({ title, subtitle }) => {
  const colors = ["bg-blue-200", "bg-purple-200", "bg-pink-200", "bg-emerald-200", "bg-yellow-200"];

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-12">
      <div className="max-w-md text-center">
        {/* Pretty animated grid pattern */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl shadow-md ${
                colors[i % colors.length]
              } ${i % 2 === 0 ? "animate-pulse" : "opacity-80"}`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-3 text-primary-content drop-shadow-sm">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-base-content/70 text-sm leading-relaxed drop-shadow">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
