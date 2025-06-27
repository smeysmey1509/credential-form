import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()], server: {
        host: true, // or 'your.local.ip.address'
    },
});
