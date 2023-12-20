// AddCommentForm.js

import React, { useState } from "react";
import { useAuth } from "../AuthContext"; // Import AuthContext

const AddCommentForm = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState("");
  const { userEmail } = useAuth(); // Use the userEmail from AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentText.trim() !== "") {
      onAddComment({ username: userEmail, commentText }); // Pass username from context
      setCommentText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formAddComment">
      <label className="labelAndText">Add Comment:</label>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add Comment here"
        className="proHeight"
      />

      <button type="submit" className="submit-comment">
        Submit
      </button>
    </form>
  );
};

export default AddCommentForm;
