# AI Anomaly Detection System

A full-stack application for video anomaly detection using machine learning models with a Django backend and React frontend.

## 🏗️ Project Structure

```
├── Backend/           # Django API server
│   ├── db.sqlite3     # SQLite database
│   ├── manage.py      # Django management script
│   ├── *.pkl          # Pre-trained ML models
│   ├── anomalies_output/  # Detected anomaly frames
│   ├── media/         # Media files
│   ├── video_api/     # Django app
│   └── videos/        # Video storage
└── Frontend/          # React web application
    ├── src/           # Source code
    ├── public/        # Static assets
    └── package.json   # Dependencies
```

## 🚀 Features

- **Video Upload & Processing**: Upload videos for anomaly detection
- **Machine Learning Models**: Uses Isolation Forest and PCA for anomaly detection
- **Real-time Results**: View detected anomalies with frame-by-frame analysis
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **RESTful API**: Django backend with comprehensive API endpoints

## 🛠️ Technologies

### Backend
- **Django**: Python web framework
- **SQLite**: Database
- **scikit-learn**: Machine learning models (Isolation Forest, PCA)
- **OpenCV/PIL**: Image processing

### Frontend
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn-ui**: Component library

## 📋 Prerequisites

- **Python 3.8+** (for Backend)
- **Node.js 16+** (for Frontend)
- **npm** or **yarn** (for Frontend dependencies)

## ⚡ Quick Start

### Backend Setup

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install django djangorestframework opencv-python scikit-learn pillow
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start development server**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

## 🔧 Development

### Backend Development

- **Run tests**: `python manage.py test`
- **Create superuser**: `python manage.py createsuperuser`
- **Django admin**: Access at `http://localhost:8000/admin`

### Frontend Development

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`

### Machine Learning Models

The project includes pre-trained models:
- `isoforest_ucsd_ped1.pkl`: Isolation Forest model for anomaly detection
- `pca_transformer.pkl`: PCA transformer for dimensionality reduction

To test model loading:
```bash
cd Backend
python test_model_loading.py
```

## 📁 Key Directories

- **`Backend/anomalies_output/`**: Contains detected anomaly frames
- **`Backend/videos/`**: Stores uploaded video files
- **`Backend/media/`**: Django media files
- **`Frontend/src/`**: React application source code
- **`Frontend/public/`**: Static assets

## 🚀 Deployment

### Frontend Deployment
This project is configured for deployment on [Github](https://github.com/MeSarthak/AI)


### Backend Deployment
For production deployment:

1. **Set environment variables**
   ```bash
   export DEBUG=False
   export ALLOWED_HOSTS=your-domain.com
   ```

2. **Collect static files**
   ```bash
   python manage.py collectstatic
   ```

3. **Use a production WSGI server** (e.g., Gunicorn)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

The Django backend provides RESTful API endpoints for:
- Video upload and processing
- Anomaly detection results
- Frame extraction and analysis

API documentation is available at `http://localhost:8000/api/docs` when running in development mode.

## 🐛 Troubleshooting

### Common Issues

1. **Model loading errors**: Ensure pickle files are in the correct directory
2. **Database issues**: Run `python manage.py migrate` to apply migrations
3. **Frontend build errors**: Delete `node_modules` and run `npm install` again
4. **CORS issues**: Configure Django CORS settings for frontend communication

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- UCSD Pedestrian Dataset for training data
- scikit-learn for machine learning capabilities
- Django and React communities for excellent frameworks