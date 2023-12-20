// DisplayedComments.js

import React from "react";
import "./displayComments.css";

const DisplayedComments = ({ comments, onDeleteComment, username }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const commentsPerPage = 5;

  if (!comments) {
    // Handle the case where comments is not defined yet
    return <p>Loading comments...</p>;
  }

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(
        `https://65814b933dfdd1b11c42e222.mockapi.io/posts/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDeleteComment(commentId);
        console.log("Comment deleted successfully");
      } else {
        console.log("Failed to delete comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderComments = () => {
    const reversedComments = currentComments.slice().reverse();

    if (reversedComments.length === 0) {
      return <p>No comments to display</p>;
    }

    return (
      <>
        <div className="display-comments-container">
          <h2>Comments - Page {currentPage}</h2>
          <ul className="commentsSection">
            {reversedComments
              .filter((comment) => comment.username === username)
              .map((comment, i) => (
                <li
                  key={comment.id}
                  style={{
                    background:
                      i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.6)",
                  }}
                >
                  <strong>{comment.username}:</strong> {comment.commentText}{" "}
                  <button
                    className="delete"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {renderComments()}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(comments.length / commentsPerPage) },
          (_, i) => (
            <button
              className="page-btn"
              key={i + 1}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default DisplayedComments;
