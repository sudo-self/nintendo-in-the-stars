// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"; // Import Firebase Storage functions

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlF6vV8QM3pgKzXHR7bxi_dHphZ-7gNr4",
  authDomain: "jessejessexyz.firebaseapp.com",
  databaseURL: "https://jessejessexyz-default-rtdb.firebaseio.com",
  projectId: "jessejessexyz",
  storageBucket: "jessejessexyz.appspot.com",
  messagingSenderId: "669687494879",
  appId: "1:669687494879:web:5737a02cff556a74fad16a",
  measurementId: "G-VNYZ9N4MNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Function to list files in the 'roms/retro' directory
async function listFiles() {
  const listRef = ref(storage, 'roms/retro/');
  const res = await listAll(listRef);
  const fileListDiv = document.getElementById('fileList');
  fileListDiv.innerHTML = ''; // Clear previous file list

  res.items.forEach(item => {
    const fileName = item.name;
    const fileItem = document.createElement('div');
    fileItem.className = 'fileItem';
    
    // Create a button for downloading the file
    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Download';
    downloadButton.onclick = async () => {
      const url = await getDownloadURL(item);
      window.open(url); // Open the file in a new tab
    };

    fileItem.innerText = fileName;
    fileItem.appendChild(downloadButton);
    fileListDiv.appendChild(fileItem);
  });
}

// Function to upload a file
async function uploadFile(file) {
  const storageRef = ref(storage, `roms/retro/${file.name}`); // Use file.name to get the uploaded file's name
  await uploadBytes(storageRef, file);
  console.log('File uploaded successfully!');
  listFiles(); // Refresh the file list after upload
}

// Event listener for file upload
document.getElementById('uploadButton').onclick = async () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    await uploadFile(file);
  }
};

// Initial load of files
listFiles();


