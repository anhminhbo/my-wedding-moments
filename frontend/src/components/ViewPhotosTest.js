import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  CardContent,
  CircularProgress,
} from "@mui/material";
import debounce from "lodash/debounce";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const ViewPhotos = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const screenHeight = window.innerHeight;
  const [pageLimit, setPageLimit] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState(false);
  const containerRef = useRef(null);
  const debouncedScroll = useRef(null);

  // Handle scroll events
  const handleScroll = () => {
    const container = containerRef.current;

    if (
      container &&
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 200
    ) {
      loadImages(false);
    }
  };

  useEffect(() => {
    // Load initial images when the component mounts
    loadImages(true);

    addScrollListener();
    return () => removeScrollListener();
  }, []);

  useEffect(() => {
    // Initialize the debouncedScroll ref with the debounced handleScroll function
    debouncedScroll.current = debounce(handleScroll, 100);
  }, []);

  const addScrollListener = () => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", debouncedScroll.current);
    }
  };

  const removeScrollListener = () => {
    if (containerRef.current) {
      containerRef.current.removeEventListener(
        "scroll",
        debouncedScroll.current
      );
    }
  };

  const loadImages = async (mount) => {
    // Simulate an API call to fetch images
    const response = await fetch(
      `${backendURL}/api/photo/getPhotosByPage?page=${page.current}`
    );

    if (mount) {
      setLoading(true);
      const data = await response.json();

      const totalPages = Math.ceil(data?.total_photos / 10);
      setPageLimit(10);

      setImages((prevImages) => [...prevImages, ...data.data]);

      page.current += 1;
      setLoading(false);
    } else {
      setLoading(true);

      const data = await response.json();
      const totalPages = Math.ceil(data?.total_photos / 10);
      setPageLimit(10);

      if (page.current <= totalPages) {
        setImages((prevImages) => [...prevImages, ...data.data]);

        page.current += 1;
        setLoading(false);
      } else {
        setLoading(false);
        setNoDataMessage(true);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ height: screenHeight + "px", overflowY: "auto" }}
    >
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} lg={3} md={4} xl={2} key={index}>
            <Card
              sx={{ minHeight: "350px", maxHeight: "500px", height: "100%" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="auto"
                  image={image.gDriveUrl}
                  alt={image.name}
                />
                <CardContent>
                  <div style={{ maxHeight: "120px", overflow: "hidden" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "pre-line",
                        display: "-webkit-box",
                        "-webkit-line-clamp": 2,
                        "-webkit-box-orient": "vertical",
                      }}
                    >
                      {image.title}
                    </Typography>
                  </div>
                  <div
                    style={{
                      maxHeight: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "pre-line",
                        display: "-webkit-box",
                        "-webkit-line-clamp": 4,
                        "-webkit-box-orient": "vertical",
                      }}
                    >
                      {image.description}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
      {noDataMessage && <p>No More Data</p>}
    </div>
  );
};

export default ViewPhotos;
