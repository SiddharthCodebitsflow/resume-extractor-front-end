<template>
    <div class="upload-container">
        <h2 class="upload-title">Upload Your Resume</h2>
        <div class="upload-box" @click="triggerFileInput" :class="{ 'hovered': isHovered }">
            <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="handleFileChange" />
            <div v-if="!file" class="upload-icon">
                <i class="fas fa-cloud-upload-alt"></i>
                <span class="upload-text">Click to upload or drag your resume</span>
            </div>
        </div>
        <div v-if="isUploading" class="upload-progress">
            <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        <div v-if="uploadError" class="error-message">{{ uploadError }}</div>
        <button v-if="file && !isUploading" class="submit-btn" @click="uploadFile" :disabled="isUploading">
            Upload Resume
        </button>
    </div>
    <div class="table-container">
        <h3 class="details-title">Resume Details</h3>
        <table class="details-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Resume Link</th>
                    <th>Full details</th>
                    <th>Resume Context</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="res in response">
                    <td>{{ res.name ?? 'Not found' }}</td>
                    <td>{{ res.email ?? 'Not found' }}</td>
                    <td>{{ res.phone ?? 'Not found' }}</td>
                    <td><a :href="api_url + res.resume_path" target="_blank">View resume</a></td>
                    <td><button @click="showViewDetails(res?.additional_details)">Show details</button></td>
                    <td>{{ res.name ?? 'Not found' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <ViewDetail v-if="showModel" :closeModleMethod="handleCloseModal" :data="additionalData" />
</template>

<script>
import axios from 'axios';
import ViewDetail from './ViewDetail.vue';


export default {
    name: 'ResumeUpload',
    components: {
        ViewDetail
    },
    data() {
        return {
            file: null,
            response: null,
            api_url: import.meta.env.VITE_API_URL_STORAGE,
            showModel: false,
            additionalData: null,
        };
    },
    methods: {
        showViewDetails(data) {
            this.additionalData = data;
            this.showModel = true;
        },
        handleCloseModal(value) {
            console.log("hello aa fsad", value);
            this.showModel = false;
        },
        handleFileChange(even) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.file = selectedFile;
            }

        },
        async uploadFile() {
            if (!this.file) {
                console.log("No file selected.");
                return;
            }
            const formData = new FormData();
            formData.append('resume', this.file);
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + 'upload-resume', formData, {
                    headers: { 'Content-Type': 'multipart/form-data', },
                });
                this.fetchData();
                console.log('File uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        },
        async fetchData() {
            await axios.get(import.meta.env.VITE_API_URL + 'get-all-details', { headers: { 'Content-Type': 'multipart/form-data', }, }).then((response) => {
                console.log(response);
                this.response = response.data.data;
            }).catch((error) => {
                console.log('Error', error);
            })
        }

    },
    created() {
        this.fetchData();
    }
};
</script>

<style scoped>
.upload-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    border: 2px dashed #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.upload-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.upload-box {
    position: relative;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.upload-box.hovered {
    background-color: #e0f7fa;
}

.upload-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #00bcd4;
}

.upload-icon .fas {
    font-size: 50px;
    margin-bottom: 10px;
}

.upload-text {
    font-size: 16px;
    color: #00bcd4;
}

.file-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
}

.file-name {
    font-size: 16px;
}

.remove-btn {
    background-color: #ff3b3b;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
}

.remove-btn:hover {
    background-color: #ff6161;
}

.upload-progress {
    margin-top: 20px;
    width: 100%;
    background-color: #ddd;
    border-radius: 5px;
    height: 8px;
}

.progress-bar {
    height: 100%;
    background-color: #4caf50;
    border-radius: 5px;
}

.error-message {
    margin-top: 15px;
    color: #e91e63;
    font-size: 14px;
}

.submit-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #00bcd4;
    color: white;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #00a3c6;
}

.submit-btn:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
}

.table-container {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
}

.details-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    text-align: left;
    font-size: 16px;
}

.details-table th,
.details-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
}

.details-table th {
    background-color: #00bcd4;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
}

.details-table td {
    background-color: #f9f9f9;
    color: #555;
}

.details-table tr:nth-child(even) td {
    background-color: #f1f1f1;
}

.details-table tr:hover td {
    background-color: #f0f8ff;
}

.details-table td {
    font-weight: 500;
}

.details-table td:last-child {
    word-wrap: break-word;
}
</style>