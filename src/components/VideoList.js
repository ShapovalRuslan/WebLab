import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { TextField, Box, Card, CardContent, Typography, CardMedia } from '@mui/material';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const videoRef = database.ref('videos');
    videoRef.on('value', (snapshot) => {
      const videosData = snapshot.val();
      const videoList = [];
      for (let id in videosData) {
        videoList.push({ id, ...videosData[id] });
      }
      setVideos(videoList);
    });
  }, []);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.trim();
    if (filterValue === '') {
      setFilter([]);
    } else {
      const tagsArray = filterValue.split(',').map((tag) => tag.trim());
      setFilter(tagsArray);
    }
  };
  
  const filteredVideos = filter.length > 0
    ? videos.filter((video) =>
        filter.every((tag) => video.tags.split(',').map((t) => t.trim()).includes(tag))
      )
    : videos;

  return (
    <Box>
      <TextField
        label="Filter by tag"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={handleFilterChange}
      />
      <Box>
        {filteredVideos.map((video) => (
          <Card key={video.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5">{video.author}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(video.date).toLocaleString()}
              </Typography>
              <Typography variant="body1">{video.tags}</Typography>
              {video.url.includes('youtube') || video.url.startsWith('http') ? (
                <CardMedia
                  component="iframe"
                  height="315"
                  src={video.url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <CardMedia component="video" height="240" controls>
                  <source src={`http://localhost:5000/${video.url}`} type="video/mp4" />
                </CardMedia>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default VideoList;
