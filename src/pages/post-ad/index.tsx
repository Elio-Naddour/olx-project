// src/pages/post-ad/index.tsx
import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/api/olxApi";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/store/slices/categorySlice";
// import { useI18n } from "@/lib/useLocalI18n"; // optional helper for translations

export default function PostAdIndex() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  const cats = Array.isArray(data) ? data : data?.categories || [];

  return (
    <div>
      <h1>Post an Ad</h1>
      <ul>
        {cats.map((c: any) => (
          <li key={c.id}>
            <span>{c.name}</span>
            <ul>
              {c?.children?.length
                ? c?.children?.map((s: any) => (
                    <li key={s.id} style={{ marginInline: "40px" }}>
                      {s?.children?.length === 0 ? (
                        <Link
                          href={`/post-ad/${s.slug}`}
                          onClick={() => {
                            dispatch(
                              setSelectedCategory({
                                selectedCategoryName: c.name,
                                selectedSubCategoryName: s.name,
                              })
                            );
                          }}
                        >
                          {s.name}
                        </Link>
                      ) : (
                        <div>{s.name}</div>
                      )}
                      <ul>
                        {s?.children?.length
                          ? s?.children?.map((ss: any) => (
                              <li key={s.id} style={{ marginInline: "40px" }}>
                                <Link
                                  href={`/post-ad/${ss.slug}`}
                                  onClick={() => {
                                    dispatch(
                                      setSelectedCategory({
                                        selectedCategoryName: c.name,
                                        selectedSubCategoryName: s.name,
                                        selectedComplementaryCategoryName:
                                          ss.name,
                                      })
                                    );
                                  }}
                                >
                                  {ss.name}
                                </Link>{" "}
                              </li>
                            ))
                          : null}
                      </ul>
                    </li>
                  ))
                : null}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
