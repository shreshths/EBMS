import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookService from "../services/BookService";

const AddBookComponent = () => {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveBook = (e) => {
    e.preventDefault();

    const book = { title, author };

    if (id) {
      BookService.updateBook(id, book)
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      BookService.createBook(book)
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteBook = (bookId, e) => {
    e.preventDefault();
    BookService.deleteBook(bookId)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    BookService.getBookById(id)
      .then((response) => {
        settitle(response.data.title);
        setauthor(response.data.author);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pgtitle = () => {
    if (id) {
      return <h2 className="text-center">Update Book</h2>;
    } else {
      return <h2 className="text-center">Add Book</h2>;
    }
  };

  const del = () => {
    if (id) {
      return (
        <div align="right">
          <button
            className="btn btn-default"
            onClick={(e) => deleteBook(id, e)}
          >
            <FontAwesomeIcon icon={faTrashCan} size="2x" />
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {pgtitle()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-lable">Title: </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-lable">Author: </label>
                  <input
                    type="text"
                    placeholder="Enter author name"
                    name="author"
                    className="form-control"
                    value={author}
                    onChange={(e) => setauthor(e.target.value)}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveBook(e)}
                >
                  Submit
                </button>
                <Link to="/" className="btn btn-danger ms-2">
                  Cancel
                </Link>
                {del()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookComponent;
