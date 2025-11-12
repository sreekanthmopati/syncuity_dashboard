const MapEmbed = ({ lat, lng, zoom = 14 }) => {
  const apiKey = "AIzaSyCMprjgZrkdhY-fHXLf-v_RrFHm1mtdJEo";
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=${zoom}&maptype=roadmap`;

  return (
    <iframe
      src={mapUrl}
      title="Dynamic Google Map"
      className="w-full h-96 rounded-lg border-0"
      allowFullScreen
      loading="lazy"
    />
  );
};


export default MapEmbed;
