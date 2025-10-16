# TMDB API Setup Guide

## Getting Started with The Movie Database (TMDB) API

### 1. Get Your API Key

1. Go to [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create an account or sign in
3. Go to [API Settings](https://www.themoviedb.org/settings/api)
4. Request an API key (it's free!)
5. Copy your API key

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# TMDB API Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**Important:** Replace `your_actual_api_key_here` with your actual TMDB API key.

### 3. API Features Included

The integration includes:

- **Movie Categories**: Now Playing, Top Rated, Popular, Upcoming
- **Real Movie Data**: Titles, posters, ratings, release years
- **Image Handling**: Automatic poster loading with fallbacks
- **Error Handling**: Graceful error states and loading indicators
- **Responsive Design**: Works on all device sizes

### 4. Available Hooks

```javascript
// Individual category hooks
const { movies, loading, error } = useNowPlayingMovies();
const { movies, loading, error } = useTopRatedMovies();
const { movies, loading, error } = usePopularMovies();
const { movies, loading, error } = useUpcomingMovies();

// Search functionality
const { movies, loading, error, searchMovies } = useMovieSearch(query);

// Movie details
const { movie, loading, error } = useMovieDetails(movieId);
```

### 5. API Rate Limits

TMDB API has rate limits:
- **Free Tier**: 1,000 requests per day
- **Paid Tier**: Higher limits available

The app includes proper error handling for rate limits.

### 6. Troubleshooting

**Common Issues:**

1. **"TMDB API key is not configured"**
   - Make sure your `.env.local` file exists
   - Check that `NEXT_PUBLIC_TMDB_API_KEY` is set correctly
   - Restart your development server after adding environment variables

2. **Images not loading**
   - Check your internet connection
   - Verify the TMDB_IMAGE_BASE_URL is correct
   - The app includes fallback placeholder images

3. **Movies not showing**
   - Check the browser console for API errors
   - Verify your API key is valid
   - Check if you've exceeded rate limits

### 7. Next Steps

Once you have the API key set up:

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. You should see real movie data loading!

### 8. Customization

You can customize the API integration by:

- Modifying `lib/tmdb.js` for different API endpoints
- Updating `hooks/useMovies.js` for different data fetching logic
- Customizing `components/MovieCard.jsx` for different display formats

### 9. Production Deployment

For production deployment:

1. Add your environment variables to your hosting platform
2. Make sure `NEXT_PUBLIC_TMDB_API_KEY` is set in production
3. Consider implementing caching for better performance

---

**Need Help?** Check the [TMDB API Documentation](https://developers.themoviedb.org/3/getting-started/introduction) for more details.
