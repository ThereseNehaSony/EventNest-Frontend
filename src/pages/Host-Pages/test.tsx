import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config/constants';

const NewPost = () => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return; // Check if a file is selected

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'wh4aph9u'); // You can set your own preset in Cloudinary
    formData.append('folder', 'event-nest'); // Optional: Specify folder in Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dpq5c5q5u/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url; // Get the uploaded image URL
   console.log(imageUrl,"image...............")
      // Now you can send this URL along with the caption to your backend
      await axios.post(`${baseUrl}/event/add-post`, {
        image: imageUrl,
        caption,
      });

      // Optionally reset form fields
      setFile(null);
      setCaption('');

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={submit} encType="multipart/form-data">
      <input type="file" onChange={fileSelected} />
      <input
        type="text"
        value={caption}
        placeholder="Caption"
        onChange={e => setCaption(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewPost;
