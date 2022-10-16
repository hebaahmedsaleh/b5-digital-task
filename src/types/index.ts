interface Post {
  title: string;
  id: number;
  body: string;
  userId: string;
}

interface Address {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  bs: string;
  name: string;
  catchPhrase: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

type ResultType = Post & { authorName: string };

type Props = {
  // eslint-disable-next-line no-undef
  children: JSX.Element;
  // eslint-enable-next-line no-undef
};

interface Photo {
  albumId: number;
  title: string;
  id: number;
  url: string;
  thumbnailUrl: string;
}

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentag: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
export type { Post, User, Address, Company, ResultType, Props, Photo, Product };
