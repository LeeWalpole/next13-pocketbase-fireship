"use client";

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Note</h1>
//     </div>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Added state for the image

  const router = useRouter();

  const create = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image); // Append the image to the form data

    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      body: formData, // Send the form data instead of JSON

      // Note: You may need to set appropriate headers for the form data
    });

    setContent("");
    setTitle("");
    setImage(null); // Reset the image state

    router.refresh();
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
        onChange={(e) => setImage(e.target.files[0])} // Set the image state when a file is selected
      />
      <button type="submit">Create note</button>
    </form>
  );
}
