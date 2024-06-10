import React, { useState } from 'react';
import axios from 'axios';
import { database } from '../firebase';
import { TextField, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

function AddVideo() {
  const [video, setVideo] = useState({
    type: 'url',
    url: '',
    author: '',
    tags: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setVideo((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleTypeChange = (e) => {
    setVideo((prev) => ({ ...prev, type: e.target.value, url: '', file: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (video.type === 'file' && !video.file) return;

    let filePath = '';
    if (video.type === 'file') {
      const formData = new FormData();
      formData.append('video', video.file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        filePath = response.data.filePath;
      } catch (error) {
        console.error('Error uploading video:', error);
        return;
      }
    } else {
      filePath = video.url;
    }

    const newVideoRef = database.ref('videos').push();
    newVideoRef.set({
      url: filePath,
      author: video.author,
      tags: video.tags,
      date: new Date().toISOString()
    });

    setVideo({ type: 'url', url: '', author: '', tags: '', file: null });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Add Video By</FormLabel>
        <RadioGroup row name="type" value={video.type} onChange={handleTypeChange}>
          <FormControlLabel value="url" control={<Radio />} label="URL" />
          <FormControlLabel value="file" control={<Radio />} label="File Upload" />
        </RadioGroup>
      </FormControl>

      {video.type === 'url' ? (
        <TextField label="Video URL" name="url" value={video.url} onChange={handleChange} required />
      ) : (
        <Button variant="contained" component="label">
          Upload Video
          <input type="file" hidden onChange={handleFileChange} required />
        </Button>
      )}
      
      <TextField label="Author" name="author" value={video.author} onChange={handleChange} required />
      <TextField label="Tags (comma-separated)" name="tags" value={video.tags} onChange={handleChange} required />
      <Button variant="contained" color="primary" type="submit">
        Add Video
      </Button>
    </Box>
  );
}

export default AddVideo;
