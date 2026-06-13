# 🎂 Birthday Wishing Website for Your Girlfriend 💕

A beautiful, elegant, and romantic birthday website with smooth transitions, heart and flower decorations, photo gallery, video section, and personalized wishes.

## Features ✨

✅ **Elegant Design** - Classic, beautiful, and romantic theme
✅ **Animated Hearts & Flowers** - Floating decorations throughout the page
✅ **Photo Gallery** - Grid layout with smooth hover transitions
✅ **Video Section** - Display special video moments
✅ **Personalized Wishes** - Dynamic birthday messages
✅ **Smooth Transitions** - All elements have beautiful animations
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
✅ **Easy to Customize** - Simple steps to add your own content

## Installation 📦

### Prerequisites
- Python 3.7 or higher
- Flask library

### Setup Steps

1. **Install Flask** (if not already installed):
   ```bash
   pip install flask
   ```

2. **Navigate to the project folder**:
   ```bash
   cd "path/to/Birthday"
   ```

3. **Run the application**:
   ```bash
   python wish.py
   ```

4. **Open in Browser**:
   - The website will start at `http://localhost:5000`
   - Open this URL in your web browser
   - You should see the beautiful birthday website! 🎉

## Deploy to Railway 🚀

Railway can host this Flask app with the static photos and videos inside `static/`.

1. Make sure the app uses the `PORT` environment variable, which is already handled in `wish.py`.
2. Add `Procfile` with:
   ```text
   web: gunicorn wish:app --bind 0.0.0.0:$PORT --workers 2
   ```
3. Ensure your custom assets live in:
   - `static/photos/`
   - `static/videos/`
4. Deploy your repo to Railway and the app will serve images and videos correctly.

> Note: Do not reference files outside `static/` for photos/videos. Railway only serves files from the app and `static/` is the correct location.

## Customization Guide 🎨

### Adding Your Photos

1. **Create a `static/photos` folder** in the project directory:
   ```
   Birthday/
   ├── wish.py
   ├── templates/
   ├── static/
   │   ├── style.css
   │   ├── script.js
   │   └── photos/
   └── templates/
   ```

2. **Place your photos** in the `static/photos` folder (jpg, png, gif formats)

3. **Update the HTML** to display your photos:
   - Open `templates/index.html`
   - Find the Gallery section (search for "gallery-grid")
   - Replace the gallery items with your photos:
   ```html
   <div class="gallery-item">
       <img src="{{ url_for('static', filename='photos/your-photo-1.jpg') }}" alt="Memory" class="gallery-image">
   </div>
   ```

4. **Add this CSS** to `static/style.css` for image styling:
   ```css
   .gallery-image {
       width: 100%;
       height: 100%;
       object-fit: cover;
       transition: transform 0.4s ease;
   }
   
   .gallery-item:hover .gallery-image {
       transform: scale(1.1);
   }
   ```

### Adding Videos

1. **Create a `static/videos` folder** in the project directory:
   ```
   Birthday/
   ├── wish.py
   ├── templates/
   ├── static/
   │   ├── style.css
   │   ├── script.js
   │   ├── photos/
   │   └── videos/
   └── templates/
   ```

2. **Place your video files** in the `static/videos` folder

3. **Update the Videos section** in `templates/index.html`:
   ```html
   <div class="video-item">
       <video width="100%" height="100%" controls>
           <source src="{{ url_for('static', filename='videos/your-video.mp4') }}" type="video/mp4">
       </video>
   </div>
   ```

### Customizing Messages & Wishes

1. **Edit Birthday Messages**:
   - Open `wish.py`
   - Find the `get_messages()` function
   - Add your custom messages to the list:
   ```python
   messages = [
       "Your custom message here! 💕",
       "Another special wish! 🌹",
       # Add more messages...
   ]
   ```

2. **Edit the Hero Section**:
   - Open `templates/index.html`
   - Find the Hero Section
   - Customize the text, quotes, and messages

### Changing Colors

1. **Edit `static/style.css`**
   - Find the `:root` section at the top
   - Modify the color variables:
   ```css
   :root {
       --primary-color: #ff69b4;        /* Main pink */
       --secondary-color: #ff1493;      /* Deep pink */
       --accent-color: #ffd700;         /* Gold */
       --light-color: #fff5f9;          /* Light background */
       --dark-color: #2c1b2f;           /* Dark text */
   }
   ```

### Adding Background Music

1. **Place your music file** in a `music` folder
2. **Uncomment the music function** in `static/script.js`:
   ```javascript
   // Uncomment this at the bottom of the script
   playBackgroundMusic();
   ```
3. **Update the URL** to point to your music file

## Project Structure 📁

```
Birthday/
├── wish.py                 # Flask application (main server)
├── templates/
│   └── index.html          # Main HTML template
├── static/
│   ├── style.css           # Beautiful styling
│   └── script.js           # Interactivity and animations
├── photos/                 # Add your photos here
├── videos/                 # Add your videos here
└── README.md               # This file
```

## Features Explained 🎯

### 🎀 Animated Background
- Floating hearts and flowers that move smoothly across the page
- Adjustable opacity and animation speeds

### 📸 Photo Gallery
- Hover effects with smooth zoom and shadow transitions
- Grid layout that adapts to screen size
- Add as many photos as you want

### 🎬 Video Section
- Displays videos with elegant styling
- Supports multiple video formats
- Responsive video player

### 💌 Wishes Section
- Dynamically loaded messages
- Card-based layout with animations
- Easy to customize messages

### 🎨 Design Elements
- Beautiful gradient backgrounds
- Smooth page transitions
- Heart and flower decorations
- Responsive on all devices

## Tips for Best Results 💡

1. **Photo Quality**: Use high-quality, well-lit photos for the best appearance
2. **Photo Aspect Ratio**: Square photos (1:1) work best in the gallery
3. **Video Format**: Use MP4 format for best browser compatibility
4. **Mobile Friendly**: Test on mobile devices to ensure everything looks good
5. **Personal Touch**: Customize the messages and quotes to make it personal

## Troubleshooting 🔧

### Port Already in Use
If port 5000 is already in use:
```bash
# Edit wish.py and change the port number
app.run(debug=True, port=5001)  # Use a different port
```

### Photos Not Showing
- Ensure photos are in the correct folder
- Check file paths in HTML
- Use relative paths starting with `{{ url_for(...) }}`

### Videos Not Playing
- Ensure videos are in MP4 format
- Check file permissions
- Verify the file path is correct

## Deployment 🚀

To share this with your girlfriend:

1. **Local Network**: Share the computer's IP address
   - Find your IP: `ipconfig` in Command Prompt
   - Share: `http://YOUR_IP:5000`

2. **Simple Hosting**: Use services like:
   - Replit (free Python hosting)
   - PythonAnywhere
   - Heroku (free tier)

3. **Save as HTML**: Export as standalone HTML file

## Browser Compatibility ✅

Works on:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Need Help? 💬

- Check that Flask is installed: `pip list`
- Verify port 5000 is not blocked
- Ensure all folders (templates, static) exist
- Check file paths are correct

---

**Made with 💕 for your special someone!**

Enjoy creating the perfect birthday surprise! 🎂✨
