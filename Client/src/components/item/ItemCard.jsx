const ItemCard = ({ items }) => {
  return (
    <div className="item-card-container">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="item-image" />
          ) : (
            <div className="broken-image">Image Not Available</div>
          )}
          <div className="item-description">{item.description}</div>
        </div>
      ))}
    </div>
  );
};
export default ItemCard;
