"use client";

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Note</h1>
//     </div>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null); // Added type annotation for the image state

  const router = useRouter();

  const create = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      body: formData,
      // Note: You may need to set appropriate headers for the form data
    });

    setContent("");
    setTitle("");
    setImage(null);

    router.reload(); // Use router.reload() instead of deprecated router.refresh()
  };

  return (
    <form onSubmit={create}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)} // Handle the case when no file is selected
      />
      <button type="submit">Create note</button>
    </form>
  );
}
