import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useGetCategoryFieldsQuery } from "@/store/api/olxApi";
import DynamicCategoryForm from "@/components/organisms/DynamicCategoryForm/DybamicCategoryForm";
import { useSelector } from "react-redux";
import type { AppState } from "@/store";

const PostAdByCategory: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useGetCategoryFieldsQuery({
    slug: (slug as string) ?? "",
  });
  const names = useSelector((state: AppState) => state.category);

  // Router is not ready on first render
  if (!router.isReady) {
    return <p>Loading...</p>;
  }

  // Safety check
  if (!slug || typeof slug !== "string") {
    return <p>Invalid category</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Post an Ad</h1>

      <p>
        Selected category slug:
        <strong style={{ marginLeft: 8 }}>{slug}</strong>
      </p>

      {data && <DynamicCategoryForm category={data} cardNames={names} />}
    </div>
  );
};

export default PostAdByCategory;
