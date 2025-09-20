import { text1, text2 } from './data.js';

let text1Container = document.getElementById('text1');
let text2Container = document.getElementById('text2');

text1Container.innerHTML = `
<h2>${text1[0].heading}</h2>
${text1[0].content}
`;
text2Container.innerHTML = `
<h2>${text2[0].heading}</h2>
${text2[0].content}
`;