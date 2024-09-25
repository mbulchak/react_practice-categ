/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category =
    categoriesFromServer.find(
      categoryDef => product.categoryId === categoryDef.id,
    ) || null; // find by product.categoryId

  const user =
    usersFromServer.find(userDef => category?.ownerId === userDef.id) || null; // find by category.ownerId

  // console.log(user);

  return {
    ...product,
    category,
    owner: user,
  };
});

// console.log(products);
const ALL_NAMES = ['Roma', 'Anna', 'Max', 'John'];
const TABLE_HEADER_TITLE = ['ID', 'Product', 'Category', 'User'];

export const App = () => {
  // const { owner } = products;
  // console.log(owner);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a data-cy="FilterAllUsers" href="#/">
                All
              </a>

              {ALL_NAMES.map(name => (
                // name
                <a
                  data-cy="FilterUser"
                  key={name}
                  href="#/"
                  className="is-active"
                >
                  {name}
                </a>
              ))}

              {/* {products.map(product => (
                <a data-cy="FilterUser" href="#/" className="is-active">
                  {product.user.name}
                </a>
              ))} */}

              {/* <a data-cy="FilterUser" href="#/">
              User 1
            </a>

            <a data-cy="FilterUser" href="#/" className="is-active">
              User 2
            </a>

            <a data-cy="FilterUser" href="#/">
              User 3
            </a> */}
            </p>

            {/* SEARCH */}
            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categoriesFromServer.map(category => {
                // const isSelected =

                return (
                  <a
                    key={category.id}
                    data-cy="Category"
                    className="button mr-2 my-1 is-info"
                    // className={cn('button mr-2 my-1', {
                    //   'is-info':
                    // })}
                    href="#/"
                  >
                    {category.title}
                  </a>
                );
              })}

              {/* <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a> */}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {TABLE_HEADER_TITLE.map(title => {
                  return (
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {title}
                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  );
                })}

                {/* <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th> */}
              </tr>
            </thead>

            <tbody>
              {products.map(product => {
                return (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {product.category.icon} - {product.category.title}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={cn({
                        'has-text-link': product.owner.sex === 'm',
                        'has-text-danger': product.owner.sex === 'f',
                      })}
                    >
                      {product.owner.name}
                    </td>
                  </tr>
                );
              })}

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  1
                </td>

                <td data-cy="ProductName">Milk</td>
                <td data-cy="ProductCategory">🍺 - Drinks</td>

                <td data-cy="ProductUser" className="has-text-link">
                  Max
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  2
                </td>

                <td data-cy="ProductName">Bread</td>
                <td data-cy="ProductCategory">🍞 - Grocery</td>

                <td data-cy="ProductUser" className="has-text-danger">
                  Anna
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  3
                </td>

                <td data-cy="ProductName">iPhone</td>
                <td data-cy="ProductCategory">💻 - Electronics</td>

                <td data-cy="ProductUser" className="has-text-link">
                  Roma
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
