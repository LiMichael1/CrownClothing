import { Link } from 'react-router-dom';

import './directory-item.styles.scss';

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  return (
    <div className='directory-item-container'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <Link className='directory-item-body-container' to={`/shop/${title}`}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default DirectoryItem;
