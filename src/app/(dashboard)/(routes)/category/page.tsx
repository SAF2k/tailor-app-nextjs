import { CategoryClient } from "./components/client";

import { format } from "date-fns";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = [
    {
      id: "1",
      name: "Billbo",
      billboard: {
        label: "Billboard 1",
      },
      createdAt: "2021-09-01T00:00:00.000Z",
    },
    {
      id: "2",
      name: "Category 2",
      billboard: {
        label: "Billboard 2",
      },
      createdAt: "2021-09-01T00:00:00.000Z",
    },
  ];

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
