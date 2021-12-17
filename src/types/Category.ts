import SourceType from "./Source";

type CategoryType = {
  id: string;
  name: string;
  media: string;
  sources: SourceType[];
};

export default CategoryType;
