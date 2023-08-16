import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = {
    id: "1",
    name: "Category 1",
    billboardId: "1",
  };

  const billboards = [
    {
      id: "1",
      label: "Billboard 1",
    },
    {
      id: "2",
      label: "Billboard 2",
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
