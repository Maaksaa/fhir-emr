import { ConfigProvider as ANTDConfigProvider } from 'antd';
import { ReactNode } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components';

import { getAppTheme, getANTDTheme } from './';
import { useTheme } from '../utils/theme';

interface Props {
    theme?: 'dark' | 'light';
    children: ReactNode;
}

const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`
  :root {
    --theme-icon-primary: ${({ theme }) =>
        theme.mode === 'dark' ? theme.neutralPalette.gray_12 : theme.primaryPalette.bcp_6};
    --theme-icon-secondary: ${({ theme }) =>
        theme.mode === 'dark' ? theme.neutralPalette.gray_6 : theme.secondaryPalette.bcs_2};
    --theme-sidebar-background: ${({ theme }) => theme.neutral.sidebarBackground};
  }

  body {
    background-color: ${({ theme }) => theme.antdTheme?.colorBgBase};
  }
`;

export function ThemeProvider(props: Props) {
    const { theme: initialTheme, children } = props;

    const { theme } = useTheme();
    const dark = (initialTheme ?? theme) === 'dark';

    const antdTheme = getANTDTheme({ dark: dark });
    const appTheme = {
        ...getAppTheme({ dark: dark }),
        mode: initialTheme ?? theme,
        antdTheme: antdTheme.token,
    };

    return (
        <ANTDConfigProvider theme={antdTheme}>
            <StyledComponentsThemeProvider theme={appTheme}>
                <GlobalStyle />
                {children}
            </StyledComponentsThemeProvider>
        </ANTDConfigProvider>
    );
}
