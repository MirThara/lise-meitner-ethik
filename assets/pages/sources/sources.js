import { imagesources, textsources } from './data.js';

let container = document.getElementById('sources-container');
let imagecontainer = document.getElementById('image-container');

container.innerHTML = `
<table>
    ${textsources.map(el => `<tr>
                <td>${el.authors}:</td>
                <td>${el.title}</td>
                <td><a href="${el.source}" target="_blank">${el.source}</a></td>
                <td>${el.info || ""},</td>
                <td>zuletzt abgerufen am: ${el.date}</td>
            </tr>`)
        .join("")
    }
</table >
    `;

imagecontainer.innerHTML = `
<table>
    ${imagesources.map(el => `<tr>
                <td>${el.name}:</td>
                <td>${el.author},</td>
                <td><a href="${el.source}">${el.source}</a></td>
                <td>${el.info || ""},</td>
                <td>zuletzt abgerufen am: ${el.date}</td>
            </tr>`)
        .join("")
    }
</table >
    `;