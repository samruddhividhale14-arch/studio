# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.




🌾AgriSync — AI-Powered Crop Health Monitoring & Forecasting System




Team Name : AgriVision 

Team Members : 1. Samruddhi Vidhale 2. Ashwini Pathak 3. Swanand Hatwar 4. Supesh Khakare


Overview

AgriSync is an AI-powered precision agriculture platform that monitors crop health, soil conditions, and pest risk in real time using Multispectral/Hyperspectral imaging, sensor fusion, and deep learning (LSTM + CNN).   The system integrates MATLAB-based analysis, IoT data via ThingSpeak, and a Firebase web app dashboard for seamless, actionable farm insights.  It empowers farmers, agronomists, and researchers to shift from *reactive to proactive* crop management.



Problem Statement

Agriculture faces increasing threats from soil degradation, unpredictable weather, and pest outbreaks, leading to significant yield losses. Traditional monitoring methods are manual, delayed, and too Technical, lacking early-warning intelligence.



Our Solution
 
AgriSync integrates:
- Hyperspectral & multispectral imaging for vegetation and soil index extraction  
- IoT sensors for soil moisture, air temperature, humidity, and leaf wetness  
- AI models (LSTM, CNN) for stress prediction and NDVI trend forecasting  
- ThingSpeak + Firebase integration for real-time visualization and mobile alerts
- Mobile Notifications that pushes alerts for abnormal readings or stress detection 


It delivers:
- Early detection of stress and disease risk, alongwith precised classification of farm.  
- Zone-specific recommendations  
- Continuous learning and predictive insights  



System Architecture

 [ Hyperspectral Camera / Drone Feed ]
→
(MATLAB Image Processing)
→
[ NDVI & Soil Indices Extraction ] ←→ [ IoT Sensors via ThingSpeak ]
→
(AI Model: LSTM/CNN)
→
[ Crop Health Classification + Forecasts ]
→
[ Firebase Web App Dashboard + Mobile Alerts ]


Tech Stack

1. Technologies Used:

- AI / Processing - MATLAB R2025b, Image Processing Toolbox, Deep Learning Toolbox 
- Sensor & IoT Layer - ThingSpeak Cloud API, DHT11, Soil Moisture, Leaf Wetness Sensors 
- Data Storage - CSV, Firebase Realtime Database 
- Web Layer - HTML, CSS, JavaScript, React, Firebase Authentication 
- Deployment - MATLAB App Designer (Desktop) + Firebase Hosting (Web) 

2. MATLAB Components: [ Used for backend development ]
   
- generate_sensor_data.m → Simulates and logs sensor readings  
- process_ndvi_grid.m → Computes NDVI and vegetation indices  
- fuse_and_alerts.m → Combines image and sensor data for zone-level alerts  
- train_ndvi_lstm.m → Trains LSTM model for predictive vegetation health  
- forecast_ndvi_dashboard.m → Displays 3-step NDVI forecast and recommendations  
- thingspeak_demo.m → Sends live field updates to ThingSpeak Cloud  

3. Web App (Firebase Integration) 

Features:
- Farmer login via Firebase Authentication
- Early disease detection before naked eye 
- Displays real-time crop health, sensor trends, and alerts  
- Syncs directly with ThingSpeak API and MATLAB outputs  
- Supports push notifications for irrigation or pest warnings
- Regional language support
- Farm-step service availablity
- 24 X 7 AI support

Tech:
- HTML, CSS, JS (Vanilla or React)
- Firebase Firestore + Realtime Database  
- REST API integration with ThingSpeak  

 
 How It Works

1. Collect Data — Sensors send live readings to ThingSpeak every 30 sec  
2. Process NDVI — MATLAB computes NDVI, vegetation indices, and anomalies  
3. Fuse Data — AI combines spectral + sensor data for health mapping  
4. Predict Future — LSTM forecasts NDVI and stress risk  
5. Visualize — Dashboards show zone maps, alerts, and recommendations  
6. Sync to Web App — Firebase pulls processed data for real-time display 

Web Dashboard Sneak Peek

- Crop health color map (NDVI visualization)  
- Real-time sensor graphs (ThingSpeak linked)  
- AI-based forecast panel  
- Alert & recommendation feed  

Demo

- Under test Dataset:  https://www.kaggle.com/datasets/janmejaybhoi/cotton-disease-dataset

- ThingSpeak Channel: [Live Dashboard] Channel Id:3093053 (AgriVision)

- ThingSpeak Live : (https://github.com/user-attachments/assets/fbce8cf0-ea60-4666-9e82-ec1ec0eacaf2)

- Dashboard(Matlab Based): (https://github.com/user-attachments/assets/13a0cd38-758e-43ce-a930-acdf3033debd)

- Simulink model: (https://github.com/user-attachments/assets/11ddb2ac-fa7b-426e-b6ea-ca859fc974f5)




Impact

✅ Enables early detection of crop stress and pest risk  
✅ Reduces water and fertilizer wastage  
✅ Boosts yield by up to *20–25%*  
✅ Scalable to different crop types and regional datasets  



-------------------------------------AI for Sustainable Agriculture — Empowering Every Farmer, Every Field ----------------------------------






