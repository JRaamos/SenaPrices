import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    mode: 'light',
    palette: {
        primary: {
            main: '#06346b',
            contrastText: '#fff',
        },
        violet: {
            main: '#8B5CF6',
            contrastText: '#fff',
        },
        ghostDark: {
            main: 'rgba(255, 255, 255, 0.07)',
            contrastText: '#CBD5E1',
            border: 'rgba(255, 255, 255, 0.15)',
        },
        slateSoft: {
            main: 'rgba(100, 116, 139, 0.08)',
            contrastText: '#64748B',
            border: 'rgba(100, 116, 139, 0.25)',
        },
        skySoft: {
            main: 'rgba(14, 165, 233, 0.08)',
            contrastText: '#0EA5E9',
            border: 'rgba(14, 165, 233, 0.25)',
        },
        header: {
            main: 'rgba(15, 23, 42, 0.97)',
            contrastText: '#fff',
        },
        blueStrong: {
            main: '#111827',
            contrastText: '#fff',
        },
        secondary: {
            main: '#0EA5E9',
            contrastText: '#fff',
        },
        white: {
            main: '#ffffff',
            contrastText: '#06346b',
        },
        lightgrey: {
            main: 'rgba(255, 255, 255, 0.15)',
            contrastText: '#ffffff',
        },
        error: {
            main: '#dd4952',
        },
        warning: {
            main: '#ffa726',
        },
        info: {
            main: '#a4a4a4',
            contrastText: '#fff',
        },
        success: {
            main: '#66bb6a',
        },
        colors: {
            white: '#ffffff',
            black: '#000000',
            grey: '#4C4C4C',
            slate950: '#0F172A',
            slate900: '#111827',
            slate800: '#1E293B',
            slate700: '#334155',
            slate600: '#475569',
            slate500: '#64748B',
            slate400: '#94A3B8',
            slate300: '#CBD5E1',
            slate200: '#E2E8F0',
            slate100: '#F1F5F9',
            slate50: '#F8FAFC',
            slate900Alpha50: 'rgba(17, 24, 39, 0.5)',
            blue600: '#2563EB',
            blue500: '#0EA5E9',
            blue400: '#3B82F6',
            blue050: '#E8F0FE',
            purple500: '#8B5CF6',
            violet300: '#A78BFA',
            green600: '#16A34A',
            green500: '#10B981',
            green100: '#D1FAE5',
            blue100: '#BFDBFE',
            yellow500: '#F59E0B',
            red500: '#EF4444',
            backgroundgrey: '#F7F7F7',
            lightgrey: '#A4A4A4',
            shadow: 'rgba(0,0,0,.16)',
            lightshadow: 'rgba(112,112,112,.06)',
            lightblue: 'rgba(59, 130, 246, 0.28)',
            shadowBlue: 'rgba(59, 130, 246, 0.12)',
            text: '#333',
            border: 'rgba(0,0,0,.12)',
            oddtable: '#e6e6e6',
            whitegrey: '#f2f2f2',
            textBlue: '#93C5FD',
            blue: "#6298DB",
            yellow: "#EEAE00",
            green: "#00DB3A",
            red: "#FF004D",
        },
        gradients: {
            hero: `
                radial-gradient(circle at 50% 12%, rgba(14, 165, 233, 0.18) 0%, rgba(14, 165, 233, 0) 26%),
                radial-gradient(circle at 85% 78%, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0) 18%),
                linear-gradient(180deg, #0F172A 0%, #111827 100%)
            `,
            dark: 'linear-gradient(180deg, #0F172A 0%, #111827 100%)',
            page: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        },
    },
});
