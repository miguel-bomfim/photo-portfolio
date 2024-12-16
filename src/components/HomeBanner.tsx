export default function HomeBanner({
  homeBackground,
}: {
  homeBackground: string;
}) {
  const bannerGif = homeBackground;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bannerGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/30" /> {/* Optional overlay */}
      <div className="relative h-full flex items-center justify-center">
        <h1 className="text-6xl md:text-9xl text-white text-center tracking-wider font-mono font-bold">
          Sarah Heloísa
        </h1>
      </div>
    </div>
  );
}