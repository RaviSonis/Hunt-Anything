  import React from 'react';
  import styled from "styled-components";
  import "./stylepaginate.css";
  


  const Paginationcss = styled.div`

  `

  class Pagination extends React.Component {

  render(){
  const postsPerPage  = this.props.postsPerPage
  const totalPosts  = this.props.totalPosts
  const paginate = this.props.paginate
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (

      <nav>
        
        <ul className='pagination' class="pagination">
        <p class="text">Select Page</p>
          {pageNumbers.map(number => (
              <button onClick={() => paginate(number)} href='!#' className='page-link' class="glow-on-hover">
                {number}
              </button>
          ))}
          
        </ul>
      </nav>
    );
  }
  };

  export default Pagination;
