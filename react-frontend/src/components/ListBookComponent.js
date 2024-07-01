import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookService from "../services/BookService";

const ListBookComponent = () => {
  const [books, setbooks] = useState([]);

  useEffect(() => {
    BookService.getAllBooks()
      .then((response) => {
        setbooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Books List</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Title</th>
          <th>Author</th>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Link
                  className="btn btn-outline-dark"
                  to={"/edit-book/" + book.id}
                >
                  <i className="bi bi-pencil-square"></i>&nbsp; Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookComponent;
