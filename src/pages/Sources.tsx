import React from "react";
import CategoryType from "../types/Category";
import Source from "../components/Library/Source";

const category: CategoryType = {
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
        "Some simple tips that will help you write cleaner React components and scale your project better.",
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
};

const Sources = (): JSX.Element => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl text-white font-semibold tracking-wide">
        Ressources {category.name}
      </h2>
      <div className="flex flex-col gap-8 mt-16">
        {category.sources.map((source) => (
          <Source key={source.id} {...source} />
        ))}
      </div>
    </div>
  );
};

export default Sources;
