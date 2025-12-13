import router from "next/router";

export default function Home() {
  return (
    <div>
      <div>Home</div>

      <button
        onClick={() => {
          router.push("/post-ad");
        }}
      >
        go to categories
      </button>
    </div>
  );
}
