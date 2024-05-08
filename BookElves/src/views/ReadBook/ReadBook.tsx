// import React, { useState } from 'react';
// import axios from 'axios';

// interface Book {
//     id: string;
//     volumeInfo: {
//         title: string;
//         authors?: string[];
//         description?: string;
//         imageLinks?: {
//             thumbnail: string;
//         };
//     };
// }

// const BookSearch: React.FC = () => {
//     const [query, setQuery] = useState<string>('');
//     const [results, setResults] = useState<Book[]>([]);

//     const searchBooks = async () => {
//         try {
//             const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
//                 params: {
//                     q: query,
//                     key: 'AIzaSyDITgvjE_kAaSWpaL0pW_5PzCSS3UoPPGc' // Replace with your actual API key
//                 }
//             });
//             setResults(response.data.items.map((item: any) => ({
//                 id: item.id,
//                 volumeInfo: item.volumeInfo
//             })));
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const renderBookImage = (book: Book) => {
//         if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
//             return (
//                 <img
//                     src={book.volumeInfo.imageLinks.thumbnail}
//                     alt={book.volumeInfo.title}
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => window.open(book.volumeInfo.previewLink, '_blank')}
//                 />
//             );
//         } else {
//             return (
//                 <div>
//                     No Image Available
//                 </div>
//             );
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search for books..."
//             />
//             <button onClick={searchBooks}>Search</button>
//             <div>
//                 {results.map((book: Book) => (
//                     <div key={book.id} style={{ margin: '20px', display: 'inline-block' }}>
//                         {renderBookImage(book)}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BookSearch;

///2nd version

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail: string;
        };
        previewLink?: string;
    };
}

const BookSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Book[]>([]);

    useEffect(() => {
        searchBooks();
    }, []); // Initial search when component mounts

    const searchBooks = async () => {
        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                    key: 'AIzaSyDITgvjE_kAaSWpaL0pW_5PzCSS3UoPPGc' // Replace with your actual API key
                }
            });
            setResults(response.data.items.map((item: any) => ({
                id: item.id,
                volumeInfo: item.volumeInfo
            })));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openBookPreview = (book: Book) => {
        if (book.volumeInfo.previewLink) {
            window.open(book.volumeInfo.previewLink, '_blank');
        } else {
            alert('No preview available for this book.');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books..."
            />
            <button onClick={searchBooks}>Search</button>
            <div>
                {results.map((book: Book) => (
                    <div key={book.id} style={{ margin: '20px', display: 'inline-block', cursor: 'pointer' }} onClick={() => openBookPreview(book)}>
                        <img
                            src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                            alt={book.volumeInfo.title}
                            style={{ width: '150px', height: '200px' }}
                        />
                        <div>{book.volumeInfo.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSearch;
