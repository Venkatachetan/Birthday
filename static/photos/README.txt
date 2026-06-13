Add your personalized photos here.

- Use JPG or PNG files.
- Keep filenames simple, for example: photo1.jpg, photo2.png
- Then update templates/index.html to reference these images using:
  {{ url_for('static', filename='photos/photo1.jpg') }}

Example gallery item:
<div class="gallery-item">
    <img src="{{ url_for('static', filename='photos/photo1.jpg') }}" alt="Memory" class="gallery-image">
</div>
