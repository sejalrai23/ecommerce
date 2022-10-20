import React, { useEffect } from 'react';
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";

function MenuHeader() {
  const category = useSelector(state => state.category)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [])


  const renderCategories = (categories) => {
    // console.log("hey", categories);
    let mycategories = [];
    for (let cat of categories) {
      mycategories.push(
        <li key={cat.name}>
          {
            cat.parentId ? <a href={`/${cat.slug}?cid=${cat._id}&type=${cat.type}`}>{cat.name}</a> : <span>{cat.name}</span>
          }

          {cat.children.length > 0 ?
            <ul>{renderCategories(cat.children)}</ul>
            : null}
        </li>
      )
    }
    return mycategories;
  };
  return (
    <div className="menu-header">
      <ul>
        {category.categories.length > 0 ? renderCategories(category.categories) : null}
      </ul>

    </div>
  )
}

export default MenuHeader
