FROM python:3.10-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Set environment variables
ENV PORT=5000
ENV FLASK_APP=wish.py

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "wish.py"]
