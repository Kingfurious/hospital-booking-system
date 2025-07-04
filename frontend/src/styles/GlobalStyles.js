import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-blue: #007BFF;
    --secondary-gray: #F5F5F5;
    --white: #FFFFFF;
    --green-success: #28A745;
    --red-error: #DC3545;
    --text-color: #333;
    --background-color: #f8f9fa;
    --card-background: #FFFFFF;
    --border-color: #ddd;
  }

  [data-theme='dark'] {
    --primary-blue: #66B2FF;
    --secondary-gray: #333;
    --white: #222;
    --green-success: #4CAF50;
    --red-error: #EF5350;
    --text-color: #f8f9fa;
    --background-color: #222;
    --card-background: #333;
    --border-color: #555;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary-blue);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  input, select, textarea {
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
    max-width: 400px;
    background-color: var(--card-background);
    color: var(--text-color);
  }
`;

export default GlobalStyles;