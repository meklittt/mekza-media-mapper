export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Media Mapper</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Media Mapper is an open-source web application framework designed to explore media objects based on their geographical location data. 
          It provides a spatially driven way of exploring how topics (such as water, the environment, landmarks) are portrayed in media across space and time.
        </p>
        <p>
          This application is designed to be easily customizable, allowing anyone to build a similar application with their own datasets by using or forking this framework.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Key Features</h2>
        <ul>
          <li>Interactive map for exploring geographically tagged media</li>
          <li>Ability to browse by zooming and panning</li>
          <li>Detailed information view for selected data points</li>
          <li>Shareable URLs for specific map data points</li>
          <li>Tabular view of the entire dataset</li>
          <li>AirTable integration for easy data management</li>
        </ul>
      </div>
    </div>
  );
}