function webpSrc(src) {
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

function ImagemProduto({ src, alt, className, width = 250, height = 250, loading = 'lazy', style }) {
  return (
    <picture>
      <source srcSet={webpSrc(src)} type="image/webp" />
      <img
        className={className}
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        style={style}
      />
    </picture>
  );
}

export default ImagemProduto;
