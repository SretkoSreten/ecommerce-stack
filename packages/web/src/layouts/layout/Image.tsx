interface ImageProps {
  imgSrc: string;
  className?: string;
}
const Image = ({ imgSrc, className }: ImageProps) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

export default Image;
