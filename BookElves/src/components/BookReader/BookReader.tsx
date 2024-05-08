// // BookReader.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const BookReader: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchBook = async () => {
//             const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
//             setBook(response.data);
//             setLoading(false);
//         };

//         fetchBook();
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!book) {
//         return <div>No book found</div>;
//     }

//     return (
//         <div>
//             <h2>{book.volumeInfo.title}</h2>
//             <p>Authors: {book.volumeInfo.authors?.join(', ')}</p>
//             <p>Description: {book.volumeInfo.description}</p>
//             {/* Render book content here */}
//             <img
//                 src={book.volumeInfo.imageLinks?.thumbnail}
//                 alt={book.volumeInfo.title}
//                 style={{ width: '150px', height: '200px' }}
//             />
//         </div>
//     );
// };

// export default BookReader;