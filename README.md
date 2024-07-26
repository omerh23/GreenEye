
# Plant Disease Identification Application

This repository contains a server-client application designed to identify diseases in plants using artificial intelligence. The application is optimized for Android devices and consists of a client-side developed in React Native and a server-side in Python, utilizing the YOLOv8 model for disease detection.

## Features

- **Automatic Analysis**: Provides farmers with automatic analysis in their greenhouses and alerts if a disease is detected.
- **IP Camera Integration**: Connect an IP camera and watch live footage from the application.
- **Screenshot Analysis**: Take screenshots and get an analysis of the greenhouse.
- **Manual Picture Analysis**: Take pictures manually from the device to get analysis results indicating if the plant is sick or healthy.
- **History View**: View the history of all identifications made in the application.

## Model Details

- **Model Used**: YOLOv8
- **Training Data**: Vine plants and hop disease images

## Repository Structure

- **Mobile (Client Side)**: Contains the React Native code for the client application.
- **Backend (Server Side)**: Contains the Python code for the server application.

## Getting Started

### Prerequisites

- Node.js and npm (for the client-side)
- Python and pip (for the server-side)
- Android device or emulator for testing

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/omerh23/GreenEye.git
   ```

2. **Client-Side Setup (React Native)**

   ```sh
   cd mobile
   npm install
   ```

3. **Server-Side Setup (Python)**

   ```sh
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Server**

   ```sh
   cd backend
   python main.py
   ```

2. **Start the Client**

   ```sh
   cd mobile
   npm start
   ```

   Follow the instructions to run the application on your Android device or emulator.

### Usage

1. **Connecting IP Camera**: Use the application to connect to an IP camera and view live footage.
2. **Screenshot Analysis**: Take screenshots from the live footage for analysis.
3. **Manual Picture Analysis**: Capture images manually using the device camera for disease analysis.
4. **View History**: Access the history of all identifications made within the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




