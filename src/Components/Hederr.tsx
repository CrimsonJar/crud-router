import React from "react";
import { Link } from "react-router-dom";

const Hederr: React.FC = ({}) => {
  return (
    <div className='hederr'>
      <Link to='/new' className='create-btn-link'>
        <button className='create-btn'>Создать пост</button>
      </Link>
    </div>
  );
};
export default Hederr;
