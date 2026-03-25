# 🌿 VisionAI Analyzer: Medicinal Herb Classifier

![UI Preview](https://img.shields.io/badge/UI-Glassmorphism-00F2FE?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React%20|%20FastAPI%20|%20Keras-blue?style=flat-square)
![Classes](https://img.shields.io/badge/Classes-30%20Medicinal%20Herbs-4FACFE?style=flat-square)

VisionAI Analyzer is a full-stack web application designed to identify and classify 30 different species of medicinal herbs using computer vision.

Built with a modern, dynamic **Glassmorphism UI**, it allows users to drag and drop images and instantly receive AI predictions with confidence scores, complete herb descriptions, and traditional medicinal uses.

---

## ✨ Key Features

* 🤖 **AI-Powered Classification**
  Deep learning model built on **EfficientNetB2 (Keras/TensorFlow)** trained on the MedLeaves dataset to classify 30 unique herbs.

* 🎨 **Premium UI/UX**
  Sleek, fully responsive Glassmorphism interface featuring:

  * Floating blur background orbs
  * Smooth drag-and-drop interactions

* 📚 **Interactive Herb Legend**
  Searchable grid containing all 30 herb classes. Hover reveals:

  * Botanical identity
  * Medicinal uses

* ⚡ **Fast Inference**
  Backend powered by **FastAPI** for fast preprocessing and predictions.

---

## 🛠️ Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS (Custom Glassmorphism design system)
* Lucide React (Icons)

### Backend

* Python & FastAPI
* Keras & TensorFlow (EfficientNetB2 Transfer Learning)
* NumPy & Pillow (Image processing)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js → https://nodejs.org/
* Python 3.8+ → https://www.python.org/

---

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/Herb-VisionAI-Analyzer.git
cd Herb-VisionAI-Analyzer
```

---

### 2. Setup Backend (FastAPI + Model)

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend will run at:
👉 http://localhost:8000

---

### 3. Setup Frontend (React App)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:
👉 http://localhost:5173

---

### 4. Usage

1. Open your browser and go to: http://localhost:5173
2. Drag & drop or upload a medicinal leaf image
3. Click **Analyze Image**
4. View prediction, confidence score, and herb details

---

## 🍃 Supported Herb Classes

The model supports the following 30 medicinal plants:

* Aloe Vera
* Amruthaballi
* Arali
* Asthma Plant
* Avocado
* Badipala
* Balloon Vine
* Bamboo
* Beans
* Betel
* Brahmi
* Bringaraja
* Caricature Plant
* Castor
* Catharanthus
* Chakte
* Chilly
* Citrus Lime
* Coffee
* Common Rue
* Coriander
* Curry Leaf
* Doddapatre
* Drumstick
* Ekka
* Eucalyptus
* Ganigale
* Ganike
* Gasagase
* Ginger

---

## 📜 License

This project is open-source and available under the **MIT License**.
