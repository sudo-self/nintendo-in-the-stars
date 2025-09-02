# <a href="https://nes-in-stars.vercel.app">nes-in-stars</a>

<img width="1512" height="863" alt="Screenshot 2025-09-02 at 04 52 12" src="https://github.com/user-attachments/assets/61bcb268-8a35-4aac-a1ad-b050bf64884f" />

### cors.json

```

  {
    "origin": ["http://localhost:3000", "https://nes-in-stars.vercel.app"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]

```

### Add to Bucket

```
 gsutil cors set cors.json gs://your-bucket-Url.com

```
