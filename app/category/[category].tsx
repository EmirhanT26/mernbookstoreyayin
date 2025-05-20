import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { books } from '../consts/books'; 
import { Book } from '../consts/books';

interface CategoryPageProps {
  category: string;
  books: Book[];
}

interface Params extends ParsedUrlQuery {
  category: string;
}

export default function CategoryPage({ category, books }: CategoryPageProps) {
  return (
    <div>
      <h1>{category}</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.name}</h2>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <img src={book.img} alt={book.name} width="100" />
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = books.map((category) => ({
    params: { category: category.category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps, Params> = async (context) => {
  const { category } = context.params as Params;
  const categoryData = books.find((cat) => cat.category === category);

  return {
    props: {
      category: category || 'Unknown',
      books: categoryData ? categoryData.items : [],
    },
  };
};
