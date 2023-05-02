export default function CustomAvatar({ src, alt, size }) {
  const avatarStyles = {
    borderRadius: "50%",
    width: size,
    height: size,
    objectFit: "cover",
  };

  return <img src={src} alt={alt} style={avatarStyles} />;
}
