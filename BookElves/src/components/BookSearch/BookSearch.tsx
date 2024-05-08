// BookSearch.tsx
import React, { useState } from 'react';
import axios from 'axios';

const BookSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [books, setBooks] = useState<any[]>([]);

    const searchBooks = async () => {
        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                    maxResults: 10, // Лимитирай броя на резултатите
                    key: '' // Подмени с твоя API ключ
                }
            });
            setBooks(response.data.items);
        } catch (error) {
            console.error('Грешка при извличане на данните:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Търси за книги..."
            />
            <button onClick={searchBooks}>Търси</button>
            <div>
                {books.map((book: any) => (
                    <div key={book.id}>
                        <h2>{book.volumeInfo.title}</h2>
                        <p>{book.volumeInfo.authors?.join(', ')}</p>
                        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                        {book.accessInfo.accessViewStatus === "SAMPLE" && (
                            <button onClick={() => window.open(book.volumeInfo.previewLink)}>Прегледай</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSearch;
