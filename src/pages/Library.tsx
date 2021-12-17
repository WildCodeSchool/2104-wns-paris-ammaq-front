import React from "react";
import Category from "../components/Library/Category";
import CategoryType from "../types/Category";

const categories: CategoryType[] = [
  {
    id: "1",
    name: "ReactJS",
    media: "https://i.ibb.co/zhxsGyQ/react.png",
    sources: [
      {
        id: "11",
        link:
          "https://javascript.plainenglish.io/5-advanced-react-patterns-a6b7624267a6",
        description:
          "An overview of 5 modern advanced React patterns, including integration codes, pros and cons, and concrete usage within public libraries.",
      },
      {
        id: "12",
        link:
          "https://itnext.io/simple-tips-for-writing-clean-react-components-c3facbf6680e",
        description:
          "some simple tips that will help you write cleaner React components and scale your project better.",
      },
      {
        id: "13",
        link:
          "https://javascript.plainenglish.io/7-interesting-react-hooks-%EF%B8%8F-d7f686811044",
        description:
          "In this article, I present 7 interesting React hooks worth trying out in your React projects.",
      },
      {
        id: "14",
        link:
          "https://medium.com/geekculture/the-1-best-design-pattern-for-managing-forms-in-react-87ae825c98f4",
        description: "The #1 Best Design Pattern for Managing Forms in React",
      },
    ],
  },
  {
    id: "2",
    name: "AdonisJS",
    media: "https://i.ibb.co/bgNGxjp/adonis.webp",
    sources: [],
  },
  {
    id: "3",
    name: "GraphQL",
    media: "https://i.ibb.co/RChq4zh/graphql.png",
    sources: [],
  },
  {
    id: "4",
    name: "Typescript",
    media: "https://i.ibb.co/3cyHkpC/typescript.png",
    sources: [],
  },
  {
    id: "5",
    name: "Docker",
    media: "https://i.ibb.co/YPtmZt3/docker.webp",
    sources: [],
  },
];

const Library = (): JSX.Element => {
  return (
    <div className="container mx-auto py-8 grid grid-cols-3 grid-rows-4 gap-8">
      {categories.map((category) => (
        <Category key={category.id} {...category} />
      ))}
    </div>
  );
};

export default Library;
